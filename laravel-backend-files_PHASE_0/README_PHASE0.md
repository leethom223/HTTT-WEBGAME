# PHASE 0 - Hướng dẫn tích hợp file Laravel

Sandbox của mình không có PHP/Composer nên không chạy `composer create-project` được.
Bro chạy các lệnh sau TRÊN MÁY THẬT của bro (nhiệm vụ 4):

```bash
composer create-project laravel/laravel game-portal-backend
cd game-portal-backend
```

Sau đó COPY 2 file trong thư mục này đè vào đúng vị trí:

- `routes/api.php` -> đè vào `game-portal-backend/routes/api.php`
- `config/cors.php` -> đè vào `game-portal-backend/config/cors.php`

Sửa file `.env` (đã có sẵn khi tạo project), đổi 3 dòng:
```
DB_DATABASE=game_portal
DB_USERNAME=root
DB_PASSWORD=          (điền password MySQL của bro, để trống nếu ko có)
```

Tạo database `game_portal` trong phpMyAdmin/MySQL Workbench, rồi chạy:
```bash
php artisan serve
```

Test: mở trình duyệt vào `http://127.0.0.1:8000/api/ping`, phải thấy `{"status":"ok"}`.

## Test CORS với React
1. Mở project React (`game-portal-frontend`), chạy `npm install && npm run dev`
2. Mở `src/main.jsx`, thêm 2 dòng:
   ```js
   import { testPing } from './testApi.js';
   testPing();
   ```
3. Mở Console trình duyệt (F12) ở trang React (thường `http://localhost:5173`) — phải thấy log `API OK: {status: 'ok'}`, không có lỗi CORS màu đỏ.

Xong bước này là hoàn thành Phase 0 (nhiệm vụ 1-5).
