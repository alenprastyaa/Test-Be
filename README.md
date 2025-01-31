**Panduan Instalasi dan Penggunaan Aplikasi Node.js & React.js**

Persyaratan Sistem Pastikan Anda telah menginstal: • Node.js (Disarankan versi terbaru) • MySQL (Untuk database)

Instalasi Backend (Node.js + Express)

Clone Repository

git clone https://github.com/alenprastyaa/Test-Be

Instal Dependensi npm install Dependensi yang akan terinstal: o express o mysql o dotenv o cors

Konfigurasi Environment (.env) Buat file .env di folder backend dan tambahkan:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=””

DB_NAME=test_app “test_app” PORT=5000

Menjalankan Server Backend Nodemon index Server akan berjalan di http://localhost:5000

Instalasi Frontend (React.js + React Bootstrap)

Masuk ke Direktori Frontend cd ../frontend

Instal Dependensi npm install Dependensi yang akan terinstal: o react-bootstrap o axios o react-router-dom

Menjalankan Aplikasi React npm start Aplikasi akan berjalan di http://localhost:3000

Catatan Tambahan • Pastikan MySQL berjalan sebelum menjalankan backend. • Jika terjadi error, pastikan dependensi sudah terinstal dengan benar. • Untuk pengelolaan database, gunakan tools seperti phpMyAdmin atau MySQL Workbench.
