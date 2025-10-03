# Kita Rehat Sejenak – AdonisJS + MySQL
"Kita Rehat Sejenak" adalah proyek backend REST API untuk aplikasi forum diskusi dengan topik santai, dibangun menggunakan AdonisJS versi modular terbaru dan MySQL. API ini menangani proses autentikasi berbasis token, pengelolaan thread (posting), serta membalas thread.

---

## Fitur
- Registrasi dan login user dengan token autentikasi (Bearer Token)
- Operasi CRUD pada thread
- Balas thread (reply ke postingan)
- Middleware auth untuk melindungi route tertentu
- Validasi input menggunakan Vine
- Seeder data dummy untuk kebutuhan pengujian
- query parameter untuk sorting, paginate, filtering threads
- Struktur proyek yang terorganisir (Controller, Model, Validator)
- dll

---

## Teknologi yang Digunakan
- AdonisJS modular (v6)
- MySQL
- TypeScript

---

## Cara Menjalankan Proyek
1. Clone repositori:
``` bash
git clone https://github.com/CatC0de1/AdonisForumApi-backend.git
cd forum-api
```

2. Install dependencies:
``` bash
npm install
```

3. Konfigurasi environment:
Buat file `.env` dan isi dengan konfigurasi database sesuai Laragon atau provider yang digunakan, contoh:
```
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=app
```

4. Jalankan migration dan seeder (opsional):
``` bash
node ace migration:run
node ace db:seed
```


5. Jalankan server pengembangan:
``` bash
node ace serve --watch
```

---

## Penggunaan API
- `POST /auth/register`: registrasi user baru
- `POST /auth/login`: login dan mendapatkan token
- `GET /threads`: menampilkan semua thread dengan paginate, sorting, filtering
- `POST /threads`: membuat thread (perlu token)
- `GET /threads/:id`: melihat detail thread
- `PUT /threads/:id`: memperbarui thread (perlu token dari pemilik thread)
- `DELETE /threads/:id`: menghapus thread (perlu token dari pemilik thread)
- `POST /threads/:id/replies`: membalas thread (perlu token)

Setiap permintaan ke endpoint yang dilindungi membutuhkan header:
```
Authorization: Bearer <token>
```

---

## Catatan
- Proyek ini menggunakan AdonisJS v6 (modular) dan struktur file dapat berbeda dari versi sebelumnya.
- Seeder tersedia untuk mengisi data dummy thread dan user.

---

## Lisensi
Proyek ini berada di atas [MIT License](https://github.com/catc0de1/AdonisForumApi-backend?tab=MIT-1-ov-file).
