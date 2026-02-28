# Serverda backend sozlash (maqola-back)

## 1. Uploads papka va huquqlar

Backend `~/maqola-back` da bo‘lsa, quyidagilarni bajaring:

```bash
cd ~/maqola-back

# articles papkasini yaratish (PDF saqlash uchun)
mkdir -p uploads/articles

# Huquqlar: ilova qaysi user bilan ishlayotgan bo‘lsa, unga berish
# Masalan pm2/node root bilan ishlayotgan bo‘lsa:
chmod -R 755 uploads

# Agar ilova boshqa user (masalan www-data) ostida ishlasa:
# sudo chown -R www-data:www-data uploads
```

## 2. (Ixtiyoriy) UPLOAD_DIR env

Agar fayllar boshqa joyda saqlansin istasangiz, `.env` yoki `ecosystem.config.js` da:

```env
UPLOAD_DIR=/root/maqola-back/uploads
```

yoki ecosystem.config.js da `env` ichida:

```js
env: {
  UPLOAD_DIR: '/root/maqola-back/uploads',
  ...
}
```

## 3. Backendni qayta ishga tushirish

O‘zgarishlarni serverga yuklab, build va restart:

```bash
cd ~/maqola-back
yarn install
yarn build
pm2 restart all
# yoki: node dist/main.js
```

## 4. Xatolikni tekshirish

PDF yuklashni urinib, loglarni ko‘ring:

```bash
pm2 logs
```

`[FileService] PDF/fayl saqlash xatolik:` chiqsa — logdagi xabar sababni ko‘rsatadi.
