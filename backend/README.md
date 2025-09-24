# 🛒 POS Backend (Laravel)

Backend untuk **Point of Sale (POS) System** menggunakan **Laravel**.  
Menyediakan API untuk autentikasi, manajemen user, role, permission, menu, dan akses fitur.

---

## 🚀 Fitur Utama

-   ✅ Autentikasi (Register, Login)
-   ✅ Manajemen Role
-   ✅ Manajemen User Role
-   ✅ Manajemen Permission
-   ✅ Manajemen Access Feature
-   ✅ Middleware JWT & Feature Based Access
-   ✅ Manajemen Menu

---

## 🛠️ Teknologi

-   [Laravel 12.x](https://laravel.com/)
-   [MySQL 8+](https://www.mysql.com/)
-   [PHP 8.4.12](https://www.php.net/)
-   [Composer](https://getcomposer.org/)
-   [JWT Auth](https://jwt-auth.readthedocs.io/en/develop/)
-   Feature Middleware (custom untuk membatasi akses API berdasarkan fitur)

---

## 📦 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/mamsky/point-of-sale.git
cd point-of-sale
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Konfigurasi Environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Atur konfigurasi database di file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pos_db
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=
```

### 4. Generate Key & Migration

```bash
php artisan key:generate
php artisan migrate --seed
```

### 5. Jalankan Server

```bash
php artisan serve
```

Backend akan berjalan di:  
👉 `http://localhost:8000`

---

## 📡 Endpoint API

### 🔐 Autentikasi

| Method | Endpoint           | Deskripsi     |
| ------ | ------------------ | ------------- |
| POST   | `/api/v1/register` | Register user |
| POST   | `/api/v1/login`    | Login user    |

---

### 📋 Table List

| Method | Endpoint            | Deskripsi        |
| ------ | ------------------- | ---------------- |
| GET    | `/api/v1/tablelist` | List daftar meja |

---

### 👥 Role Management

| Method | Endpoint            | Deskripsi      |
| ------ | ------------------- | -------------- |
| GET    | `/api/v1/role`      | List role      |
| POST   | `/api/v1/role`      | Buat role baru |
| PUT    | `/api/v1/role/{id}` | Update role    |
| DELETE | `/api/v1/role/{id}` | Hapus role     |

---

### 👤 User Role Management

| Method | Endpoint                 | Deskripsi           |
| ------ | ------------------------ | ------------------- |
| GET    | `/api/v1/user-role`      | List user role      |
| POST   | `/api/v1/user-role`      | Buat user role baru |
| PUT    | `/api/v1/user-role/{id}` | Update user role    |
| DELETE | `/api/v1/user-role/{id}` | Hapus user role     |

---

### 🔑 Permission Management

| Method | Endpoint                  | Deskripsi            |
| ------ | ------------------------- | -------------------- |
| GET    | `/api/v1/permission`      | List permission      |
| POST   | `/api/v1/permission`      | Buat permission baru |
| PUT    | `/api/v1/permission/{id}` | Update permission    |
| DELETE | `/api/v1/permission/{id}` | Hapus permission     |

---

### ⚙️ Access Feature Management

| Method | Endpoint                      | Deskripsi                |
| ------ | ----------------------------- | ------------------------ |
| GET    | `/api/v1/access-feature`      | List access feature      |
| POST   | `/api/v1/access-feature`      | Buat access feature baru |
| PUT    | `/api/v1/access-feature/{id}` | Update access feature    |
| DELETE | `/api/v1/access-feature/{id}` | Hapus access feature     |

---

### 📂 Menu Management

| Method | Endpoint            | Deskripsi      |
| ------ | ------------------- | -------------- |
| GET    | `/api/v1/menu`      | List menu      |
| GET    | `/api/v1/menu/{id}` | Detail menu    |
| POST   | `/api/v1/menu`      | Buat menu baru |
| PUT    | `/api/v1/menu/{id}` | Update menu    |
| DELETE | `/api/v1/menu/{id}` | Hapus menu     |

---

## 🔒 Middleware

-   **JwtMiddleware** → Memvalidasi token JWT sebelum akses API.
-   **FeatureMiddleware** → Membatasi akses endpoint berdasarkan fitur (`roles`, `userrole`, `permission`, `accessfeature`, dll).

---

## 👨‍💻 Author

Dibuat oleh **Septania** ✨
