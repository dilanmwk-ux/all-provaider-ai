# Nova AI Chat

Tampilan chat terinspirasi oleh tata letak minimalis asisten AI: sidebar riwayat, ruang percakapan luas, prompt awal, dan composer di bawah. Identitas visual, nama, ikon, dan palet warna dibuat berbeda.

## Deploy ke Vercel
1. Ekstrak ZIP dan upload seluruh isi folder ke GitHub.
2. Import repository di https://vercel.com/new.
3. Framework preset: Other. Build command dan output directory dapat dikosongkan.
4. Deploy.

`api/chat.js` bertindak sebagai proxy server-side ke endpoint Zyv​​or agar browser tidak langsung memanggil domain API pihak ketiga.

## Lokal
```bash
npm i -g vercel
vercel dev
```

API pihak ketiga harus tetap aktif dan mengizinkan penggunaan. Proxy tidak menjamin layanan tersedia jika API membatasi atau sedang down.
