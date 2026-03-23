import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Markup, Telegraf } from 'telegraf';

const WELCOME_UZ = `Assalomu alaykum! Global Journal of Teaching and Science botiga xush kelibsiz.
Savolingizni yozing — admin tez orada javob beradi.`;

const JOIN_CHANNEL_UZ = `Botdan foydalanish uchun avval kanalimizga a'zo bo'lishingiz kerak.
Quyidagi tugmani bosing va kanalga o'ting, so'ng /start ni qayta yuboring.`;

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf | null = null;
  /** Bir nechta admin: vergul bilan ajratilgan chat_id lar (masalan: 5897585608, 5531717864) */
  private readonly adminChatIds: Set<string>;
  /** Majburiy kanal: @PinnacleScience — botdan foydalanish uchun a'zo bo'lish kerak */
  private readonly channelUsername: string;
  private readonly channelLink: string;
  /** Admin chatida yuborilgan xabar message_id -> foydalanuvchi chat_id (reply yuborish uchun) */
  private readonly messageIdToUserChatId = new Map<number, number>();

  constructor(private config: ConfigService) {
    const raw = this.config.get<string>('ADMIN_CHAT_ID') || '';
    this.adminChatIds = new Set(
      raw
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean),
    );
    this.channelUsername = (this.config.get<string>('TELEGRAM_CHANNEL_USERNAME') || '').trim();
    this.channelLink = (this.config.get<string>('TELEGRAM_CHANNEL_LINK') || 'https://t.me/PinnacleScience').trim();
  }

  private isAdmin(chatId: number | string): boolean {
    return this.adminChatIds.has(String(chatId));
  }

  /** Admin chat_id lariga xabar yuborish (xatolik bo'lsa davom etadi). */
  private async broadcastToAdmins(
    telegram: Telegraf['telegram'],
    text: string,
  ): Promise<void> {
    for (const adminId of this.adminChatIds) {
      try {
        await telegram.sendMessage(adminId, text);
      } catch (e) {
        console.error('[Telegram] Admin log yuborishda xato, chat_id:', adminId, e);
      }
    }
  }

  /** Foydalanuvchi majburiy kanalda ekanligini tekshiramiz (adminlar tekshiruvdan o'tkazilmaydi) */
  private async isChannelMember(userId: number): Promise<boolean> {
    if (!this.bot || !this.channelUsername) return true; // kanal sozlanmagan bo'lsa cheklov yo'q
    try {
      const member = await this.bot.telegram.getChatMember(
        this.channelUsername.startsWith('@') ? this.channelUsername : `@${this.channelUsername}`,
        userId,
      );
      const status = member.status;
      return status === 'creator' || status === 'administrator' || status === 'member' || status === 'restricted';
    } catch {
      return false;
    }
  }

  private async replyJoinChannel(ctx: { reply: (text: string, extra?: object) => Promise<unknown> }): Promise<void> {
    await ctx.reply(JOIN_CHANNEL_UZ, Markup.inlineKeyboard([[Markup.button.url("Kanalga o'tish", this.channelLink)]]));
  }

  async onModuleInit() {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN');
    if (!token || this.adminChatIds.size === 0) {
      console.warn('[Telegram] TELEGRAM_BOT_TOKEN yoki ADMIN_CHAT_ID .env da yo\'q — bot ishga tushmaydi.');
      return;
    }

    this.bot = new Telegraf(token);

    // /start — kanalda bo'lmasa kanalga o'tishni so'raymiz
    this.bot.start(async (ctx) => {
      if (this.isAdmin(ctx.chat.id)) return ctx.reply(WELCOME_UZ);
      if (!this.channelUsername) return ctx.reply(WELCOME_UZ);
      const isMember = await this.isChannelMember(ctx.from.id);
      if (!isMember) return this.replyJoinChannel(ctx);
      return ctx.reply(WELCOME_UZ);
    });

    // /chatid — chat_id ni bilish uchun (admin sozlashda yordam); adminlar uchun, oddiy user kanalda bo'lishi kerak
    this.bot.command('chatid', async (ctx) => {
      if (!this.isAdmin(ctx.chat.id) && this.channelUsername) {
        const isMember = await this.isChannelMember(ctx.from.id);
        if (!isMember) return this.replyJoinChannel(ctx);
      }
      return ctx.reply(`Sizning chat_id: ${ctx.chat.id}`);
    });

    // Foydalanuvchidan kelgan xabar (admin emas) -> avval kanalda ekanligini tekshiramiz, keyin admin ga yuboramiz
    this.bot.on('text', async (ctx) => {
      const userChatId = ctx.chat.id;
      const text = (ctx.message.text || '').trim();
      console.log('[Telegram] Xabar keldi, chat_id:', userChatId, 'matn:', text?.slice(0, 50));
      if (text.startsWith('/')) return; // /start, /chatid va boshqa buyruqlar boshqa handler da

      // Admin emas va kanal majburiy bo'lsa — kanalda bo'lishni tekshiramiz
      if (!this.isAdmin(userChatId) && this.channelUsername) {
        const isMember = await this.isChannelMember(ctx.from.id);
        if (!isMember) return this.replyJoinChannel(ctx);
      }
      const from = ctx.from;
      const userName = [from.first_name, from.last_name].filter(Boolean).join(' ') || from.username || `ID:${from.id}`;

      if (this.isAdmin(userChatId)) {
        console.log('[Telegram] Admin xabar yubordi (reply kerak)');
        // Admin javob yubormoqda (reply)
        const replyTo = ctx.message.reply_to_message;
        if (replyTo?.message_id != null) {
          const targetUserChatId = this.messageIdToUserChatId.get(replyTo.message_id);
          if (targetUserChatId != null) {
            try {
              await ctx.telegram.sendMessage(targetUserChatId, `📩 Javob:\n\n${text}`);
              const adminName =
                [ctx.from?.first_name, ctx.from?.last_name].filter(Boolean).join(' ') ||
                ctx.from?.username ||
                `ID:${ctx.from?.id ?? 'unknown'}`;
              await this.broadcastToAdmins(
                ctx.telegram,
                `✅ Javob foydalanuvchiga yuborildi\nAdmin: ${adminName}\nFoydalanuvchi chat_id: ${targetUserChatId}\n\n${text}`,
              );
              await ctx.reply('✅ Javob foydalanuvchiga yuborildi.');
            } catch (e) {
              await ctx.reply('❌ Foydalanuvchiga yuborib bo\'lmadi (bloklagan yoki xato).');
            }
            this.messageIdToUserChatId.delete(replyTo.message_id);
            return;
          }
        }
        return ctx.reply('Bu xabarga reply qiling — javob savol yuborgan foydalanuvchiga boradi.');
      }

      // Oddiy foydalanuvchi savol yubordi -> barcha adminlarga yuboramiz
      console.log('[Telegram] Foydalanuvchi savol yubordi, adminlarga yuboriladi, chat_id:', userChatId);
      const adminText = `👤 Savol (chat_id: ${userChatId})\nIsm: ${userName}\n\n${text}`;
      let sentToUser = false;
      try {
        for (const adminId of this.adminChatIds) {
          const sent = await ctx.telegram.sendMessage(adminId, adminText);
          this.messageIdToUserChatId.set(sent.message_id, userChatId);
        }
        await ctx.reply('Savolingiz qabul qilindi. Admin tez orada javob beradi.');
        sentToUser = true;
        console.log('[Telegram] Barcha adminlarga yuborildi, chat_id:', userChatId);
      } catch (e) {
        console.error('[Telegram] Admin ga yuborish xato:', e);
        try {
          await ctx.reply('Xatolik yuz berdi. Keyinroq urinib ko\'ring.');
          sentToUser = true;
        } catch (_) {}
      }
      if (!sentToUser) {
        try {
          await ctx.reply('Savol qabul qilindi. Agar javob kelmasa, keyinroq qayta yozing.');
        } catch (_) {
          console.error('[Telegram] Foydalanuvchiga javob yuborib bo\'lmadi, chat_id:', userChatId);
        }
      }
    });

    // Botni await qilmasdan ishga tushiramiz — HTTP server (port 8000) bloklanmasin
    this.bot
      .launch()
      .then(() => console.log('[Telegram] Bot ishga tushdi: @pinnacleSciencebot'))
      .catch((err: unknown) => {
        const ex = err as { response?: { error_code?: number } };
        if (ex?.response?.error_code === 409) {
          console.warn(
            "[Telegram] Bot boshqa joyda ishlayapti (Conflict). Faqat bitta instance ishlashi kerak.",
          );
        } else {
          console.error('[Telegram] Bot ishga tushmadi:', err);
        }
      });
  }

  async onModuleDestroy() {
    if (this.bot) {
      this.bot.stop('SHUTDOWN');
    }
  }
}
