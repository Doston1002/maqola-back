# Telegram bot ishlamasa (javob bermasa)

## Muhim: qaysi akkauntdan test qilyapsiz?

Agar siz **admin** (ADMIN_CHAT_ID sizning chat_id ingiz) bo‘lsangiz va **o‘sha akkauntdan** botga xabar yuborsangiz, bot sizga "Savolingiz qabul qilindi" yubormaydi. U sizni admin deb biladi va javobida "Bu xabarga reply qiling — javob savol yuborgan foydalanuvchiga boradi" deydi.

**Foydalanuvchi tarafini tekshirish uchun:** boshqa Telegram akkauntidan (ikkinchi raqam yoki do‘stingiz) botga xabar yuboring. O‘sha akkauntda "Savolingiz qabul qilindi. Admin tez orada javob beradi." chiqishi kerak.

## Asosiy sabab: bir nechta instance (409 Conflict)

Telegram har bir xabarni **faqat bitta** bot instance’iga yuboradi. Agar bot **ikkita joyda** ishlasa (masalan: server + kompyuteringizda `npm run start`), yangi xabarlar tasodifan bitta instance’ga tushadi, ikkinchisi hech narsa olmaydi. Shuning uchun ba’zi xabarlarga javob keladi, ba’zilariga kelmaydi.

### Nima qilish kerak

1. **Kompyuteringizda** backend ishlab turgan bo‘lsa — to‘xtating (Ctrl+C yoki terminalni yoping).
2. **Serverda** faqat bitta process bo‘lishini ta’minlang:
   ```bash
   pm2 list
    
   # maqola-back yoki backend bitta marta ro‘yxatda bo‘lsin
   pm2 restart maqola-back
   ```
3. Boshqa server yoki Replit kabi joylarda ham shu bot tokeni ishlatilayotgan bo‘lsa — u yerdagi botni ham to‘xtating.

## .env tekshiruvi

Serverda (yoki .env faylida):

- `TELEGRAM_BOT_TOKEN` — BotFather bergan token.
- `ADMIN_CHAT_ID` — Admin (sizning) chat_id. Botga `/chatid` yuborib olishingiz mumkin; javobda raqam chiqadi.

So‘ng backend ni qayta ishga tushiring: `pm2 restart maqola-back`

## Bot qanday ishlaydi

- Foydalanuvchi xabar yozadi → bot admin’ga yuboradi va foydalanuvchiga "Savolingiz qabul qilindi..." deb javob qaytaradi.
- Admin o‘sha xabarga **reply** qilib javob yozadi → bot bu javobni savol yuborgan foydalanuvchiga yuboradi.

Agar "Savolingiz qabul qilindi" ham kelmasa — ko‘pincha bot boshqa joyda ham ishlayapti (409). Barcha joylarda to‘xtatib, faqat serverda qoldiring.
