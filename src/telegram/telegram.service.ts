import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

const WELCOME_UZ = `Assalomu alaykum! Global Journal of Teaching and Science botiga xush kelibsiz.
Savolingizni yozing — admin tez orada javob beradi.`;

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf | null = null;
  private readonly adminChatId: string;
  /** Admin chatida yuborilgan xabar message_id -> foydalanuvchi chat_id (reply yuborish uchun) */
  private readonly messageIdToUserChatId = new Map<number, number>();

  constructor(private config: ConfigService) {
    this.adminChatId = this.config.get<string>('ADMIN_CHAT_ID') || '';
  }

  async onModuleInit() {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN');
    if (!token || !this.adminChatId) {
      console.warn('[Telegram] TELEGRAM_BOT_TOKEN yoki ADMIN_CHAT_ID .env da yo\'q — bot ishga tushmaydi.');
      return;
    }

    this.bot = new Telegraf(token);

    // /start
    this.bot.start((ctx) => {
      return ctx.reply(WELCOME_UZ);
    });

    // /chatid — chat_id ni bilish uchun (admin sozlashda yordam)
    this.bot.command('chatid', (ctx) => {
      return ctx.reply(`Sizning chat_id: ${ctx.chat.id}`);
    });

    // Foydalanuvchidan kelgan xabar (admin emas) -> admin ga yuboramiz
    this.bot.on('text', async (ctx) => {
      const userChatId = ctx.chat.id;
      const text = (ctx.message.text || '').trim();
      if (text.startsWith('/')) return; // /start, /chatid va boshqa buyruqlar boshqa handler da
      const from = ctx.from;
      const userName = [from.first_name, from.last_name].filter(Boolean).join(' ') || from.username || `ID:${from.id}`;

      if (String(userChatId) === String(this.adminChatId)) {
        // Admin javob yubormoqda (reply)
        const replyTo = ctx.message.reply_to_message;
        if (replyTo?.message_id != null) {
          const targetUserChatId = this.messageIdToUserChatId.get(replyTo.message_id);
          if (targetUserChatId != null) {
            try {
              await ctx.telegram.sendMessage(targetUserChatId, `📩 Javob:\n\n${text}`);
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

      // Oddiy foydalanuvchi savol yubordi -> admin ga yuboramiz
      const adminText = `👤 Savol (chat_id: ${userChatId})\nIsm: ${userName}\n\n${text}`;
      let sentToUser = false;
      try {
        const sent = await ctx.telegram.sendMessage(this.adminChatId, adminText);
        this.messageIdToUserChatId.set(sent.message_id, userChatId);
        await ctx.reply('Savolingiz qabul qilindi. Admin tez orada javob beradi.');
        sentToUser = true;
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

    try {
      await this.bot.launch();
      console.log('[Telegram] Bot ishga tushdi: @pinnacleSciencebot');
    } catch (err: unknown) {
      const ex = err as { response?: { error_code?: number } };
      if (ex?.response?.error_code === 409) {
        console.warn(
          "[Telegram] Bot boshqa joyda ishlayapti (Conflict). Faqat bitta instance ishlashi kerak.",
        );
      } else {
        console.error('[Telegram] Bot ishga tushmadi:', err);
      }
    }
  }

  async onModuleDestroy() {
    if (this.bot) {
      this.bot.stop('SHUTDOWN');
    }
  }
}
