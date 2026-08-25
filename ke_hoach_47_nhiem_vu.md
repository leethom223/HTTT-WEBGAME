# KẾ HOẠCH THỰC HIỆN — 47 NHIỆM VỤ
## Đồ án: Website Game Trực Tuyến (mô hình tương tự GameVui.vn)

> File này tách riêng từ đề cương báo cáo — dùng làm checklist làm việc hàng ngày, tick dần từng bước con (a, b, c...) trong mỗi nhiệm vụ. Nội dung báo cáo chính thức (Chương 1-4) nằm ở file `de_cuong_do_an_web_game.md`.

---

## LỘ TRÌNH THỰC HIỆN — NHIỆM VỤ 1 → 47 (làm tuần tự, từng bước con nhỏ)

> Mỗi nhiệm vụ lớn (1, 2, 3...) được chia thành các bước con (a, b, c...) — mỗi bước con là 1 hành động cụ thể, làm xong trong vài phút. Tick hết bước con thì nhiệm vụ coi như xong, kiểm tra lại bằng dòng "Xong khi".

### PHASE 0 — Chuẩn bị

**1. Chốt tên đề tài chính thức**
- [ ] a. Liệt kê 2–3 tên đề tài dự phòng, VD: *"Xây dựng website cổng game trực tuyến"*, *"Hệ thống website chơi game HTML5 đa nền tảng"*
- [ ] b. Loại bỏ tên nào dễ gây hiểu lầm là "sao chép GameVui"
- [ ] c. Chọn 1 tên chính + giữ 1–2 tên dự phòng
- [ ] d. Gửi email/nhắn tin cho GVHD xin duyệt tên
- [ ] e. Ghi tên chính thức vào trang bìa báo cáo sau khi được duyệt
- **Xong khi:** trang bìa báo cáo có tên đề tài đã được GVHD duyệt

**2. Chốt danh sách tính năng P0/P1/P2**
- [ ] a. Đọc lại bảng phân loại P0/P1/P2 (mục "Kế hoạch thực hiện chi tiết" bên dưới)
- [ ] b. Copy bảng ra 1 file riêng (Google Sheet/Trello) để tick tiến độ
- [ ] c. Đọc lại, thêm/bớt nếu thấy chưa hợp lý
- [ ] d. Chốt và không sửa tiếp từ đây
- **Xong khi:** có file checklist tính năng cố định, tách biệt khỏi báo cáo

**3. Cài môi trường phát triển**
- [x] a. Cài PHP ≥ 8.2 (windows.php.net hoặc `sudo apt install php8.2`)
- [x] b. Gõ `php -v` xác nhận version
- [x] c. Cài Composer (getcomposer.org/download)
- [x] d. Gõ `composer -V` xác nhận
- [x] e. Cài Node.js LTS (nodejs.org)
- [x] f. Gõ `node -v` và `npm -v` xác nhận
- [x] g. Cài MySQL — XAMPP (apachefriends.org) hoặc `docker run --name mysql-game -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8`
- [x] h. Cài VS Code (code.visualstudio.com)
- [ ] i. Cài extension "PHP Intelephense" và "ES7+ React/Redux snippets" (Ctrl+Shift+X trong VS Code)
- [ ] j. Tạo thư mục project gốc, chạy `git init`
- [ ] k. Tạo repo mới trên GitHub, copy link
- [ ] l. Chạy `git remote add origin <link>`
- **Xong khi:** `php -v`, `composer -V`, `node -v`, `npm -v`, `mysql --version` đều chạy không lỗi; `git remote -v` hiện đúng repo

**4. Tạo project Laravel**
- [x] a. Chạy `composer create-project laravel/laravel game-portal-backend`
- [x] b. `cd game-portal-backend`
- [x] c. Chạy `php artisan serve`
- [x] d. Mở `http://127.0.0.1:8000`, xác nhận thấy trang chào Laravel
- [x] e. Sửa `.env`: `DB_DATABASE=game_portal`, `DB_USERNAME`, `DB_PASSWORD`
- [x] f. Tạo database `game_portal` trong phpMyAdmin/Workbench
- [x] g. Chạy `php artisan migrate` để test kết nối
- **Xong khi:** bước g chạy xong không lỗi kết nối DB

**5. Tạo project React + test CORS**
- [x] a. Chạy `npm create vite@latest game-portal-frontend -- --template react`
- [x] b. `cd game-portal-frontend && npm install`
- [x] c. `npm run dev`, mở link hiện ra, xác nhận thấy trang chào Vite+React
- [x] d. `npm install axios`
- [x] e. Ở Laravel, thêm route test trong `routes/api.php`: trả JSON `{status: 'ok'}`
- [x] f. Mở `config/cors.php`, thêm origin `http://localhost:5173`
- [x] g. Ở React, gọi thử `axios.get(...)` rồi `console.log` kết quả
- [x] h. Mở Console trình duyệt (F12), xác nhận thấy `{status:'ok'}`, không lỗi CORS
- **Xong khi:** bước h thành công

### PHASE 1 — Viết Chương 1 & 2 (làm song song lúc chờ setup)

**6. Viết mục 1.1–1.2**
- [x] a. Liệt kê 5 lý do chọn đề tài ra giấy nháp
- [x] b. Chọn 3 lý do mạnh nhất, viết thành đoạn văn 1.1
- [x] c. Viết 2–3 mục tiêu cụ thể, đo lường được
- [x] d. Đọc lại, chỉnh câu chữ mạch lạc
- **Xong khi:** mục 1.1–1.2 dài ~1–2 trang, đọc xuôi không lặp ý

**7. Viết mục 1.3–1.4**
- [x] a. Liệt kê giới hạn kỹ thuật (thanh toán, nguồn game — xem mục "Nguồn game hợp pháp")
- [x] b. Viết thành đoạn văn 1.3
- [x] c. Gạch đầu dòng kết quả dự kiến đạt được
- [x] d. Viết thành đoạn văn 1.4
- **Xong khi:** mục 1.3–1.4 khớp với danh sách P0 đã chốt ở nhiệm vụ 2

**8. Viết Chương 2.1**
- [x] a. Đọc 1–2 bài về kiến trúc client–server, RESTful API
- [x] b. Tóm tắt lại bằng lời văn riêng
- [x] c. Vẽ sơ đồ đơn giản (Client ↔ API ↔ Database) bằng draw.io, xuất PNG
- [x] d. Viết đoạn giải thích HTML5 Canvas/WebGL
- **Xong khi:** mục 2.1 hoàn chỉnh, có ít nhất 1 hình minh họa

**9. Viết Chương 2.2**
- [x] a. Viết giới thiệu React (component/state/hook) kèm 1 đoạn code ví dụ
- [x] b. Viết giới thiệu Laravel (MVC/Eloquent/Routing), vẽ hình MVC (Hình 2.1 như mẫu gốc)
- [x] c. Viết giới thiệu MySQL
- [x] d. Viết giới thiệu Unity WebGL export
- **Xong khi:** mục 2.2 hoàn chỉnh, có hình MVC

### PHASE 2 — Phân tích & thiết kế (Chương 3)

**10. Khảo sát thực tế**
- [x] a. Vào gamevui.vn — ghi chú menu, cách chia danh mục, tính năng nổi bật
- [x] b. Làm tương tự với y8.com, friv.com
- [x] c. Chụp 2–3 ảnh màn hình mỗi site
- [x] d. Viết bảng so sánh 3 site theo tiêu chí: giao diện, số lượng game, tính năng thành viên
- [x] e. Viết nhận xét: điểm học hỏi, điểm sẽ làm khác
- **Xong khi:** có bảng so sánh + nhận xét trong mục 3.1.1–3.1.2

**11. Yêu cầu hệ thống & kế hoạch thực hiện**
- [x] a. Copy bảng lộ trình 14 tuần (mục bên dưới) dán vào 3.1.4
- [x] b. Liệt kê yêu cầu chức năng — mỗi module P0/P1 viết 1 dòng
- [x] c. Liệt kê yêu cầu phi chức năng (tốc độ, bảo mật, khả năng mở rộng)
- **Xong khi:** mục 3.1.3–3.1.4 hoàn chỉnh

**12. Bảng Actor & Usecase**
- [x] a. Vẽ bảng 3 cột: Actor | Usecase | Ghi chú
- [x] b. Điền dòng Khách
- [x] c. Điền dòng Thành viên
- [x] d. Điền dòng Admin
- **Xong khi:** bảng 3.4 đầy đủ 3 actor

**13. Vẽ Usecase diagram**
- [x] a. Cài/mở draw.io (app.diagrams.net)
- [x] b. Tạo file, chọn template UML Usecase
- [x] c. Vẽ hình tổng quát: 3 actor + toàn bộ usecase + đường nối
- [x] d. Xuất PNG, đặt tên đúng thứ tự Hình 3.x
- [x] e. Lặp lại c–d cho usecase Game, Tài khoản, Danh mục (3 module P0)
- **Xong khi:** đủ 4 file PNG hình usecase

**14. Đặc tả usecase**
- [x] a. Tạo bảng mẫu 6 dòng: Mục tiêu / Actor / Điều kiện tiên quyết / Luồng chính / Luồng thay thế / Hậu điều kiện
- [x] b. Điền cho usecase "Chơi game"
- [x] c. Điền cho usecase "Đăng ký/Đăng nhập"
- [x] d. Điền cho usecase "CRUD Game"
- **Xong khi:** có đủ bảng đặc tả cho các usecase P0

**15. Activity + Sequence diagram**
- [x] a. Vẽ Activity diagram "Đăng ký" (bắt đầu → nhập form → validate → lưu DB → kết thúc)
- [x] b. Vẽ Sequence diagram tương ứng (React → Controller → Model → DB)
- [x] c. Lặp lại a–b cho "Đăng nhập", "CRUD Game" (1 bộ đại diện, ghi chú "tương tự" cho phần còn lại), "Chơi game"
- [x] d. Xuất toàn bộ ra PNG
- **Xong khi:** đủ ~18–22 hình theo chiến lược rút gọn (xem mục bên dưới)

**16. Thiết kế ERD**
- [x] a. Liệt kê lại từng bảng từ mục "Đề xuất CSDL" ở Chương 3
- [x] b. Xác định kiểu dữ liệu từng cột
- [x] c. Xác định khóa chính/khóa ngoại, vẽ quan hệ
- [x] d. Gõ DBML trên dbdiagram.io
- [x] e. Xuất hình ERD ra PNG
- **Xong khi:** có hình ERD đầy đủ + bảng mô tả cột cho từng bảng

**17. Wireframe**
- [x] a. Tạo frame Trang chủ trên Figma (hoặc vẽ tay)
- [x] b. Tạo frame Trang danh mục
- [x] c. Tạo frame Trang chi tiết game
- [x] d. Tạo frame Trang admin danh sách game
- [x] e. Xuất/chụp ảnh cả 4 frame
- **Xong khi:** có đủ 4 wireframe làm cơ sở code giao diện

### PHASE 3 — Backend (Laravel)

**18. Tạo migration**
- [x] a. `php artisan make:model Game -m`
- [x] b. Thêm cột trong migration `games`: name, slug, thumbnail, play_url, description, play_count, age_rating, status
- [x] c. `php artisan make:model Category -m`, thêm cột name, slug, icon
- [x] d. `php artisan make:migration create_game_category_table` (bảng pivot game_id, category_id)
- [x] e. `php artisan make:model Comment -m`, `Favorite -m`, `PlayHistory -m`, thêm cột tương ứng
- [x] f. Sửa migration `users` có sẵn: thêm cột `role`, `avatar`
- **Xong khi:** đủ 7 file migration, chưa chạy

**19. Migrate + seed dữ liệu mẫu**
- [x] a. `php artisan migrate`
- [x] b. `php artisan make:seeder CategorySeeder`, code 5 category mẫu
- [x] c. `php artisan make:seeder GameSeeder`, code 10 game mẫu (dữ liệu giả tạm)
- [x] d. `php artisan db:seed`
- [x] e. Kiểm tra bảng `categories`, `games` trong phpMyAdmin có dữ liệu
- **Xong khi:** bước e xác nhận có dữ liệu mẫu

**20. Auth API**
- [x] a. `php artisan install:api` (hoặc `composer require laravel/sanctum`)
- [x] b. `php artisan make:controller Api/AuthController`
- [x] c. Code `register()` — validate, tạo user, trả token
- [x] d. Code `login()` — validate credentials, trả token
- [x] e. Code `logout()` — revoke token
- [x] f. Thêm route `/register`, `/login`, `/logout` trong `routes/api.php`
- [x] g. Test `/api/register` trên Postman
- [x] h. Test `/api/login`, xác nhận nhận token
- **Xong khi:** bước h trả token hợp lệ

**21. API CRUD Game**
- [x] a. `php artisan make:controller Api/GameController --api`
- [x] b. Code `index()` — hỗ trợ `?sort=`, `?category=`, `?search=`
- [x] c. Code `show($slug)`
- [x] d. Code `store()` — validate + upload thumbnail qua `Storage::disk('public')`
- [x] e. Code `update($id)`
- [x] f. Code `destroy($id)`
- [x] g. Thêm `Route::apiResource('games', GameController::class)`
- [x] h. Test cả 5 method trên Postman
- **Xong khi:** cả 5 thao tác test đúng kết quả

**22. API CRUD Category**
- [x] a. `php artisan make:controller Api/CategoryController --api`
- [x] b. Code tương tự Game, bỏ phần upload file
- [x] c. Thêm `Route::apiResource('categories', CategoryController::class)`
- [x] d. Test qua Postman
- **Xong khi:** CRUD Category hoạt động đúng

**23. API Comment / Favorite / PlayHistory**
- [x] a. `CommentController`: `store()`, `index($gameId)`, `destroy()`
- [x] b. `FavoriteController`: `toggle($gameId)`
- [x] c. `PlayHistoryController`: `store($gameId)`, `index()`
- [x] d. Thêm route cho cả 3 controller
- [x] e. Test từng API trên Postman
- **Xong khi:** cả 3 nhóm API hoạt động đúng

**24. Middleware phân quyền**
- [x] a. `php artisan make:middleware IsAdmin`
- [x] b. Code kiểm tra `auth()->user()->role === 'admin'`, ngược lại trả lỗi 403
- [x] c. Đăng ký middleware trong `bootstrap/app.php`
- [x] d. Bọc route quản trị (store/update/destroy) bằng middleware này
- [x] e. Test tài khoản member gọi route admin, xác nhận nhận lỗi 403
- [x] f. Export Postman Collection ra file JSON, lưu vào thư mục báo cáo
- **Xong khi:** bước e và f hoàn tất


### PHASE 4 — Frontend (React)

**25. Layout chung**
- [x] a. Tạo thư mục `src/components`
- [x] b. Tạo `Header.jsx` (logo + menu danh mục + tìm kiếm + nút đăng nhập)
- [x] c. Tạo `Footer.jsx`
- [x] d. `npm install react-router-dom`
- [x] e. Tạo `Layout.jsx` bọc Header + `<Outlet />` + Footer
- [x] f. Cấu hình `App.jsx` dùng `<BrowserRouter>`
- **Xong khi:** header/footer hiện trên mọi trang khi chạy `npm run dev`

**26. Trang chủ**
- [x] a. Tạo `pages/Home.jsx`
- [x] b. `useEffect` gọi API `?sort=hot`
- [x] c. Gọi thêm `?sort=new` và game hay (3 khối riêng)
- [x] d. Tạo `GameCard.jsx` (thumbnail + tên + lượt chơi)
- [x] e. Map ra lưới `GameCard`, style CSS Grid
- **Xong khi:** trang chủ hiện đúng game thật theo 3 khối Hot/Mới/Hay

**27. Trang danh mục**
- [x] a. Tạo route `/category/:slug`
- [x] b. Tạo `CategoryPage.jsx`, lấy `slug` bằng `useParams()`
- [x] c. Gọi API lọc theo category + `?page=`
- [x] d. Thêm nút phân trang Trước/Sau
- **Xong khi:** chọn danh mục ra đúng game thuộc danh mục đó

**28. Trang chi tiết game + `<GamePlayer>`**
- [x] a. Tạo route `/game/:slug`, `GameDetail.jsx`
- [x] b. Gọi API lấy chi tiết game
- [x] c. Tạo `GamePlayer.jsx`: nếu `url` là link ngoài → iframe link đó; nếu là file local → iframe trỏ file local
- [x] d. Chèn `<GamePlayer url={game.play_url} />`
- **Xong khi:** bấm vào 1 game, chơi được ngay trên trang

**29. Đăng ký/đăng nhập + hồ sơ**
- [x] a. Tạo `Register.jsx` — form + gọi API register
- [x] b. Tạo `Login.jsx` — form + gọi API login, lưu token
- [x] c. Tạo `AuthContext.jsx` lưu thông tin user, dùng chung toàn app
- [x] d. Sửa `Header.jsx`: hiện tên/nút đăng xuất nếu đã đăng nhập
- [x] e. Tạo `Profile.jsx` khung trống (chờ Phase 6)
- **Xong khi:** đăng nhập xong tên hiện trên header, đăng xuất được

**30. Admin — quản lý Game**
- [x] a. Tạo route `/admin/games`, `GameList.jsx`
- [x] b. Hiển thị bảng danh sách (tên, danh mục, trạng thái, nút sửa/xóa)
- [x] c. Tạo `GameForm.jsx` — form thêm/sửa, input upload thumbnail
- [x] d. Nối nút "Thêm" → mở form → submit gọi API store
- [x] e. Nối nút "Sửa" → mở form pre-fill → submit gọi API update
- [x] f. Nối nút "Xóa" → confirm → gọi API destroy
- **Xong khi:** thêm 1 game qua admin, thấy xuất hiện ngay ở trang chủ

**31. Admin — Category/User/Comment**
- [x] a. Lặp cấu trúc nhiệm vụ 30 cho `/admin/categories`
- [x] b. Tạo `/admin/users` — xem danh sách + đổi role/khóa tài khoản
- [x] c. Tạo `/admin/comments` — danh sách + nút xóa (kiểm duyệt)
- **Xong khi:** quản lý được cả 3 nhóm dữ liệu qua giao diện admin

**32. Dọn dữ liệu giả**
- [x] a. Tìm toàn bộ project từ khóa "mock" hoặc dữ liệu hardcode
- [x] b. Xóa từng chỗ, thay bằng gọi API thật
- [x] c. Test lại toàn bộ trang đã làm
- **Xong khi:** bước c xác nhận sạch, không còn dữ liệu giả


### PHASE 5 — Tích hợp nội dung game thật

**33. Build game Unity WebGL đã có**
- [x] a. Mở project Unity của game đã có
- [x] b. File → Build Settings → WebGL → Switch Platform
- [x] c. Bấm Build, chọn thư mục output
- [x] d. Copy thư mục build vào thư mục game tự host trong project (`public/games/2048`, `tower-building`, `hextris`, `flappy-bird`, `snake-retro`)
- [x] e. Chạy server thật, mở `index.html` qua đó (không mở bằng `file://`)
- **Xong khi:** bước e game load và chơi được, không lỗi console

**34. Nhúng game từ GameDistribution**
- [x] a. Tạo tài khoản publisher tại gamedistribution.com
- [x] b. Duyệt catalog, chọn 3–5 game phù hợp (kiểm tra rating độ tuổi)
- [x] c. Copy link embed dạng `https://embed.gamedistribution.com/{game-id}/` cho từng game
- [x] d. Thêm từng game vào `/admin/games`, dán link vào `play_url`
- [x] e. Kiểm tra lại trên trang chi tiết, xác nhận chơi được
- **Xong khi:** cả 3–5 game nhúng đều chơi được

**35. *(tuỳ chọn)* Tự host game mã nguồn mở**
- [x] a. Tìm game HTML5 nhỏ license MIT trên GitHub
- [x] b. Tải về, đặt vào thư mục game tự host
- [x] c. Thêm vào admin với `play_url` là đường dẫn local
- **Xong khi:** (nếu làm) game này chơi được như game tự làm

**36. Test đa nền tảng**
- [x] a. Test toàn bộ game trên Chrome
- [x] b. Test lại trên Firefox
- [x] c. Bật responsive mode trong DevTools, thử màn hình điện thoại
- [x] d. Nếu có điện thoại thật, mở web thật thử luôn
- [x] e. Ghi bảng: Tên game | Chrome | Firefox | Mobile | Ghi chú lỗi
- **Xong khi:** có bảng ghi chú đầy đủ, dùng cho phần kiểm thử


### PHASE 6 — Tính năng P1

**37. Yêu thích game**
- [x] a. Thêm icon trái tim vào `GameCard.jsx` và `GameDetail.jsx`
- [x] b. Gọi API toggle favorite khi bấm icon
- [x] c. Đổi màu icon theo trạng thái đã yêu thích (lấy từ API khi load trang)
- [x] d. Trong `Profile.jsx`, gọi API lấy danh sách game yêu thích, hiển thị ra
- **Xong khi:** bấm tim, load lại trang vẫn giữ đúng trạng thái

**38. Lịch sử đã chơi**
- [x] a. Gọi API ghi log khi game bắt đầu load trong `GamePlayer.jsx`/`GameDetail.jsx`
- [x] b. Trong `Profile.jsx`, gọi API lấy lịch sử, hiển thị sort theo thời gian mới nhất
- **Xong khi:** chơi 1 game xong, vào Profile thấy game đó ở đầu danh sách

**39. Bình luận**
- [x] a. Thêm form bình luận vào `GameDetail.jsx` (chỉ hiện nếu đã đăng nhập)
- [x] b. Gọi API store khi submit, load lại danh sách bình luận
- [x] c. Hiển thị danh sách kèm tên người bình luận + thời gian
- [x] d. Thêm nút xóa nếu bình luận là của chính mình
- **Xong khi:** gửi bình luận hiện ngay, xóa được bình luận của mình

**40. Tìm kiếm**
- [x] a. Thêm ô input trong `Header.jsx`
- [x] b. Khi submit, chuyển hướng tới `/search?q=...`
- [x] c. Tạo `SearchResults.jsx`, gọi API search
- [x] d. Hiển thị kết quả giống layout trang danh mục
- **Xong khi:** gõ tên game ra đúng kết quả


### PHASE 7 — Kiểm thử

**41. Unit test**
- [ ] a. Tạo `tests/Feature/AuthTest.php`
- [ ] b. Viết test: đăng ký thành công, thiếu field báo lỗi, đăng nhập đúng/sai mật khẩu
- [ ] c. Tạo `GameControllerTest.php`, viết test CRUD cơ bản
- [ ] d. Chạy `php artisan test`
- [ ] e. Chụp màn hình kết quả để chèn báo cáo
- **Xong khi:** bước d toàn bộ test pass

**42. Kiểm thử tích hợp**
- [ ] a. Lập bảng test case: STT | Bước | Kết quả mong đợi | Kết quả thực tế | Pass/Fail
- [ ] b. Test thủ công toàn luồng: đăng ký → đăng nhập → duyệt game → chơi → yêu thích → bình luận → đăng xuất
- [ ] c. Nếu có bước Fail, sửa code rồi test lại tới khi Pass hết
- **Xong khi:** bảng test case toàn bộ Pass

**43. Tối ưu hiệu năng**
- [ ] a. Chạy Lighthouse (Chrome DevTools) audit trang chủ, ghi điểm ban đầu
- [ ] b. Nén ảnh thumbnail (tinypng.com) trước khi upload
- [ ] c. Thêm `loading="lazy"` cho ảnh trong danh sách game
- [ ] d. Chạy lại Lighthouse, ghi điểm sau khi tối ưu
- **Xong khi:** điểm sau cao hơn điểm trước, có số liệu ghi lại

### PHASE 8 — Hoàn thiện báo cáo & bảo vệ

**44. Bổ sung hình ảnh thật**
- [ ] a. Rà lại toàn bộ báo cáo, đánh dấu hình còn placeholder/thiếu
- [ ] b. Chạy web thật, chụp đúng màn hình cần minh họa
- [ ] c. Chèn vào đúng vị trí, đánh số hình đúng thứ tự
- **Xong khi:** không còn hình nào thiếu hoặc ghi TODO

**45. Kết luận + Tài liệu tham khảo**
- [ ] a. Viết đoạn tóm tắt kết quả đạt được so với mục tiêu Chương 1
- [ ] b. Viết đoạn hạn chế còn tồn tại + hướng phát triển tiếp
- [ ] c. Liệt kê tài liệu tham khảo đúng format trích dẫn của trường
- **Xong khi:** mục Kết luận + TLTK hoàn chỉnh

**46. Rà soát format**
- [ ] a. Kiểm tra font/cỡ chữ/giãn dòng đúng quy định trường
- [ ] b. Kiểm tra canh lề đúng mẫu
- [ ] c. Cập nhật lại Mục lục tự động (Word: References → Update Table)
- [ ] d. Kiểm tra đánh số trang đúng vị trí
- **Xong khi:** file khớp 100% mẫu quy định của trường

**47. Chuẩn bị bảo vệ**
- [ ] a. Làm slide: vấn đề → mục tiêu → kiến trúc/công nghệ → demo (screenshot) → kết luận
- [ ] b. Test demo trước ở nơi sẽ bảo vệ nếu được
- [ ] c. Soạn trước câu trả lời cho câu hỏi dự kiến (đặc biệt về nguồn game/bản quyền)
- [ ] d. Tập demo toàn bộ luồng ít nhất 2 lần, canh thời gian
- **Xong khi:** demo chạy trơn tru đúng thời gian quy định, trả lời được câu hỏi dự kiến
