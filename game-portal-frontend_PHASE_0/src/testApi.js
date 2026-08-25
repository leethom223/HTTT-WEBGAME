// File test CORS - nhiệm vụ 5g/5h
// Sau khi Laravel chạy (php artisan serve, mặc định port 8000), gọi thử API ping
import axios from 'axios';

export function testPing() {
  axios.get('http://127.0.0.1:8000/api/ping')
    .then(res => console.log('API OK:', res.data)) // phải ra {status: 'ok'}
    .catch(err => console.error('API loi (kiem tra CORS/backend da chay chua):', err.message));
}
