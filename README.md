# Resto Project

Sebuah aplikasi restoran berbasis web yang mengintegrasikan frontend React dan backend Laravel untuk manajemen pesanan dan status meja secara real-time.

### 📌 Deskripsi Proyek

Resto Project dirancang untuk membantu restoran dalam mengelola pesanan pelanggan dan status meja secara efisien. Dengan antarmuka pengguna yang responsif dan backend yang kuat, aplikasi ini menyediakan fitur-fitur seperti:

 - Pemesanan menu makanan dan minuman

 - Pembaruan status meja secara real-time

 - Pembuatan dan pembayaran tagihan

 - Autentikasi pengguna dan manajemen sesi


### 🛠️ Teknologi yang Digunakan
## Frontend

 - React: Library JavaScript untuk membangun antarmuka pengguna

 - React Router: Untuk navigasi antar halaman

 - Tailwind CSS: Framework CSS untuk desain responsif dan modern

 - Axios: Untuk melakukan HTTP request ke backend

## Backend

 - Laravel: Framework PHP untuk membangun aplikasi web dengan arsitektur MVC

 - MySQL: Sistem manajemen basis data relasional

 - Laravel Sanctum: Untuk autentikasi API berbasis token

### 📁 Struktur Direktori

/Resto_project

├── /frontend

│   ├── /src

│   ├── /public

│   └── package.json

└── /backend

    ├── /app
    
    ├── /database
    
    └── composer.json

### 🚀 Cara Menjalankan Proyek

1. Clone Repository
   
   git clone https://github.com/SeptaniaSep/Resto_project.git

   cd Resto_project
   
2. Setup Backend (Laravel)
  
   - Masuk ke direktori backend:

     cd backend

   - Install dependensi PHP:

     composer install

   - Salin file .env.example ke .env:

     cp .env.example .env

   - Generate key aplikasi:

     php artisan key:generate

   - Migrasi database:

     php artisan migrate
   
   - Jalankan server:

     php artisan serve

  3. Setup Frontend (React)

     - Kembali ke direktori utama:

       cd ..
     
     - Masuk ke direktori frontend:

       cd frontend

     - Install dependensi Node.js:

       npm install

     - Jalankan server pengembangan:

       npm start

Aplikasi frontend akan berjalan di http://localhost:3000 dan backend di http://localhost:8000.
