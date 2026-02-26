# Serverda backend tekshirish

## 1. Loglarni ko‘rish (xato bormi?)
```bash
pm2 logs maqola-back --lines 100
```
Agar MongoDB ulanish xatosi, PORT yoki boshqa xato bo‘lsa — shu yerda ko‘rinadi.

## 2. 8000 port ochiqmi?
```bash
ss -tlnp | grep 8000
# yoki
netstat -tlnp | grep 8000
```
Chiqish bo‘lmasa — ilova 8000 da eshitmayapti (crash yoki boshqa port).

## 3. .env fayl (bo‘shluqsiz)
Serverdagi `~/maqola-back/.env` da:
```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/your_db_name
```
`PORT = 8000` emas, `PORT=8000` (tenglik atrofida bo‘shliq bo‘lmasin).

## 4. Build va to‘g‘ri ishga tushirish
```bash
cd ~/maqola-back
npm run build
pm2 delete maqola-back
pm2 start ecosystem.config.js
pm2 save
```

## 5. Lokal tekshirish
```bash
curl -s http://127.0.0.1:8000/api
```
Javob (masalan 404 yoki JSON) kelsa — backend ishlayapti. `Connection refused` — ilova ishlamayapti.

## 6. MongoDB ishlayaptimi?
```bash
systemctl status mongod
# yoki
mongosh --eval "db.runCommand({ping:1})"
```
Agar MongoDB yoqilmasa — backend ulanishda crash qiladi.
