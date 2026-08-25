# ĐỀ CƯƠNG CHI TIẾT ĐỒ ÁN TỐT NGHIỆP
## Đề tài: Xây dựng Website Game Trực Tuyến (mô hình tương tự GameVui.vn)

> Đề cương này bám sát 100% khung chương mục của mẫu đồ án bro gửi (Tổng quan → Kiến thức nền tảng → Phân tích thiết kế → Xây dựng chương trình), chỉ thay nội dung "cửa hàng/sản phẩm" bằng "cổng game/lượt chơi".

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
- [ ] a. Cài PHP ≥ 8.2 (windows.php.net hoặc `sudo apt install php8.2`)
- [ ] b. Gõ `php -v` xác nhận version
- [ ] c. Cài Composer (getcomposer.org/download)
- [ ] d. Gõ `composer -V` xác nhận
- [ ] e. Cài Node.js LTS (nodejs.org)
- [ ] f. Gõ `node -v` và `npm -v` xác nhận
- [ ] g. Cài MySQL — XAMPP (apachefriends.org) hoặc `docker run --name mysql-game -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8`
- [ ] h. Cài VS Code (code.visualstudio.com)
- [ ] i. Cài extension "PHP Intelephense" và "ES7+ React/Redux snippets" (Ctrl+Shift+X trong VS Code)
- [ ] j. Tạo thư mục project gốc, chạy `git init`
- [ ] k. Tạo repo mới trên GitHub, copy link
- [ ] l. Chạy `git remote add origin <link>`
- **Xong khi:** `php -v`, `composer -V`, `node -v`, `npm -v`, `mysql --version` đều chạy không lỗi; `git remote -v` hiện đúng repo

**4. Tạo project Laravel**
- [ ] a. Chạy `composer create-project laravel/laravel game-portal-backend`
- [ ] b. `cd game-portal-backend`
- [ ] c. Chạy `php artisan serve`
- [ ] d. Mở `http://127.0.0.1:8000`, xác nhận thấy trang chào Laravel
- [ ] e. Sửa `.env`: `DB_DATABASE=game_portal`, `DB_USERNAME`, `DB_PASSWORD`
- [ ] f. Tạo database `game_portal` trong phpMyAdmin/Workbench
- [ ] g. Chạy `php artisan migrate` để test kết nối
- **Xong khi:** bước g chạy xong không lỗi kết nối DB

**5. Tạo project React + test CORS**
- [ ] a. Chạy `npm create vite@latest game-portal-frontend -- --template react`
- [ ] b. `cd game-portal-frontend && npm install`
- [ ] c. `npm run dev`, mở link hiện ra, xác nhận thấy trang chào Vite+React
- [ ] d. `npm install axios`
- [ ] e. Ở Laravel, thêm route test trong `routes/api.php`: trả JSON `{status: 'ok'}`
- [ ] f. Mở `config/cors.php`, thêm origin `http://localhost:5173`
- [ ] g. Ở React, gọi thử `axios.get(...)` rồi `console.log` kết quả
- [ ] h. Mở Console trình duyệt (F12), xác nhận thấy `{status:'ok'}`, không lỗi CORS
- **Xong khi:** bước h thành công

### PHASE 1 — Viết Chương 1 & 2 (làm song song lúc chờ setup)

**6. Viết mục 1.1–1.2**
- [ ] a. Liệt kê 5 lý do chọn đề tài ra giấy nháp
- [ ] b. Chọn 3 lý do mạnh nhất, viết thành đoạn văn 1.1
- [ ] c. Viết 2–3 mục tiêu cụ thể, đo lường được
- [ ] d. Đọc lại, chỉnh câu chữ mạch lạc
- **Xong khi:** mục 1.1–1.2 dài ~1–2 trang, đọc xuôi không lặp ý

**7. Viết mục 1.3–1.4**
- [ ] a. Liệt kê giới hạn kỹ thuật (thanh toán, nguồn game — xem mục "Nguồn game hợp pháp")
- [ ] b. Viết thành đoạn văn 1.3
- [ ] c. Gạch đầu dòng kết quả dự kiến đạt được
- [ ] d. Viết thành đoạn văn 1.4
- **Xong khi:** mục 1.3–1.4 khớp với danh sách P0 đã chốt ở nhiệm vụ 2

**8. Viết Chương 2.1**
- [ ] a. Đọc 1–2 bài về kiến trúc client–server, RESTful API
- [ ] b. Tóm tắt lại bằng lời văn riêng
- [ ] c. Vẽ sơ đồ đơn giản (Client ↔ API ↔ Database) bằng draw.io, xuất PNG
- [ ] d. Viết đoạn giải thích HTML5 Canvas/WebGL
- **Xong khi:** mục 2.1 hoàn chỉnh, có ít nhất 1 hình minh họa

**9. Viết Chương 2.2**
- [ ] a. Viết giới thiệu React (component/state/hook) kèm 1 đoạn code ví dụ
- [ ] b. Viết giới thiệu Laravel (MVC/Eloquent/Routing), vẽ hình MVC (Hình 2.1 như mẫu gốc)
- [ ] c. Viết giới thiệu MySQL
- [ ] d. Viết giới thiệu Unity WebGL export
- **Xong khi:** mục 2.2 hoàn chỉnh, có hình MVC

### PHASE 2 — Phân tích & thiết kế (Chương 3)

**10. Khảo sát thực tế**
- [ ] a. Vào gamevui.vn — ghi chú menu, cách chia danh mục, tính năng nổi bật
- [ ] b. Làm tương tự với y8.com, friv.com
- [ ] c. Chụp 2–3 ảnh màn hình mỗi site
- [ ] d. Viết bảng so sánh 3 site theo tiêu chí: giao diện, số lượng game, tính năng thành viên
- [ ] e. Viết nhận xét: điểm học hỏi, điểm sẽ làm khác
- **Xong khi:** có bảng so sánh + nhận xét trong mục 3.1.1–3.1.2

**11. Yêu cầu hệ thống & kế hoạch thực hiện**
- [ ] a. Copy bảng lộ trình 14 tuần (mục bên dưới) dán vào 3.1.4
- [ ] b. Liệt kê yêu cầu chức năng — mỗi module P0/P1 viết 1 dòng
- [ ] c. Liệt kê yêu cầu phi chức năng (tốc độ, bảo mật, khả năng mở rộng)
- **Xong khi:** mục 3.1.3–3.1.4 hoàn chỉnh

**12. Bảng Actor & Usecase**
- [ ] a. Vẽ bảng 3 cột: Actor | Usecase | Ghi chú
- [ ] b. Điền dòng Khách
- [ ] c. Điền dòng Thành viên
- [ ] d. Điền dòng Admin
- **Xong khi:** bảng 3.4 đầy đủ 3 actor

**13. Vẽ Usecase diagram**
- [ ] a. Cài/mở draw.io (app.diagrams.net)
- [ ] b. Tạo file, chọn template UML Usecase
- [ ] c. Vẽ hình tổng quát: 3 actor + toàn bộ usecase + đường nối
- [ ] d. Xuất PNG, đặt tên đúng thứ tự Hình 3.x
- [ ] e. Lặp lại c–d cho usecase Game, Tài khoản, Danh mục (3 module P0)
- **Xong khi:** đủ 4 file PNG hình usecase

**14. Đặc tả usecase**
- [ ] a. Tạo bảng mẫu 6 dòng: Mục tiêu / Actor / Điều kiện tiên quyết / Luồng chính / Luồng thay thế / Hậu điều kiện
- [ ] b. Điền cho usecase "Chơi game"
- [ ] c. Điền cho usecase "Đăng ký/Đăng nhập"
- [ ] d. Điền cho usecase "CRUD Game"
- **Xong khi:** có đủ bảng đặc tả cho các usecase P0

**15. Activity + Sequence diagram**
- [ ] a. Vẽ Activity diagram "Đăng ký" (bắt đầu → nhập form → validate → lưu DB → kết thúc)
- [ ] b. Vẽ Sequence diagram tương ứng (React → Controller → Model → DB)
- [ ] c. Lặp lại a–b cho "Đăng nhập", "CRUD Game" (1 bộ đại diện, ghi chú "tương tự" cho phần còn lại), "Chơi game"
- [ ] d. Xuất toàn bộ ra PNG
- **Xong khi:** đủ ~18–22 hình theo chiến lược rút gọn (xem mục bên dưới)

**16. Thiết kế ERD**
- [ ] a. Liệt kê lại từng bảng từ mục "Đề xuất CSDL" ở Chương 3
- [ ] b. Xác định kiểu dữ liệu từng cột
- [ ] c. Xác định khóa chính/khóa ngoại, vẽ quan hệ
- [ ] d. Gõ DBML trên dbdiagram.io
- [ ] e. Xuất hình ERD ra PNG
- **Xong khi:** có hình ERD đầy đủ + bảng mô tả cột cho từng bảng

**17. Wireframe**
- [ ] a. Tạo frame Trang chủ trên Figma (hoặc vẽ tay)
- [ ] b. Tạo frame Trang danh mục
- [ ] c. Tạo frame Trang chi tiết game
- [ ] d. Tạo frame Trang admin danh sách game
- [ ] e. Xuất/chụp ảnh cả 4 frame
- **Xong khi:** có đủ 4 wireframe làm cơ sở code giao diện

### PHASE 3 — Backend (Laravel)

**18. Tạo migration**
- [ ] a. `php artisan make:model Game -m`
- [ ] b. Thêm cột trong migration `games`: name, slug, thumbnail, play_url, description, play_count, age_rating, status
- [ ] c. `php artisan make:model Category -m`, thêm cột name, slug, icon
- [ ] d. `php artisan make:migration create_game_category_table` (bảng pivot game_id, category_id)
- [ ] e. `php artisan make:model Comment -m`, `Favorite -m`, `PlayHistory -m`, thêm cột tương ứng
- [ ] f. Sửa migration `users` có sẵn: thêm cột `role`, `avatar`
- **Xong khi:** đủ 7 file migration, chưa chạy

**19. Migrate + seed dữ liệu mẫu**
- [ ] a. `php artisan migrate`
- [ ] b. `php artisan make:seeder CategorySeeder`, code 5 category mẫu
- [ ] c. `php artisan make:seeder GameSeeder`, code 10 game mẫu (dữ liệu giả tạm)
- [ ] d. `php artisan db:seed`
- [ ] e. Kiểm tra bảng `categories`, `games` trong phpMyAdmin có dữ liệu
- **Xong khi:** bước e xác nhận có dữ liệu mẫu

**20. Auth API**
- [ ] a. `php artisan install:api` (hoặc `composer require laravel/sanctum`)
- [ ] b. `php artisan make:controller Api/AuthController`
- [ ] c. Code `register()` — validate, tạo user, trả token
- [ ] d. Code `login()` — validate credentials, trả token
- [ ] e. Code `logout()` — revoke token
- [ ] f. Thêm route `/register`, `/login`, `/logout` trong `routes/api.php`
- [ ] g. Test `/api/register` trên Postman
- [ ] h. Test `/api/login`, xác nhận nhận token
- **Xong khi:** bước h trả token hợp lệ

**21. API CRUD Game**
- [ ] a. `php artisan make:controller Api/GameController --api`
- [ ] b. Code `index()` — hỗ trợ `?sort=`, `?category=`, `?search=`
- [ ] c. Code `show($slug)`
- [ ] d. Code `store()` — validate + upload thumbnail qua `Storage::disk('public')`
- [ ] e. Code `update($id)`
- [ ] f. Code `destroy($id)`
- [ ] g. Thêm `Route::apiResource('games', GameController::class)`
- [ ] h. Test cả 5 method trên Postman
- **Xong khi:** cả 5 thao tác test đúng kết quả

**22. API CRUD Category**
- [ ] a. `php artisan make:controller Api/CategoryController --api`
- [ ] b. Code tương tự Game, bỏ phần upload file
- [ ] c. Thêm `Route::apiResource('categories', CategoryController::class)`
- [ ] d. Test qua Postman
- **Xong khi:** CRUD Category hoạt động đúng

**23. API Comment / Favorite / PlayHistory**
- [ ] a. `CommentController`: `store()`, `index($gameId)`, `destroy()`
- [ ] b. `FavoriteController`: `toggle($gameId)`
- [ ] c. `PlayHistoryController`: `store($gameId)`, `index()`
- [ ] d. Thêm route cho cả 3 controller
- [ ] e. Test từng API trên Postman
- **Xong khi:** cả 3 nhóm API hoạt động đúng

**24. Middleware phân quyền**
- [ ] a. `php artisan make:middleware IsAdmin`
- [ ] b. Code kiểm tra `auth()->user()->role === 'admin'`, ngược lại trả lỗi 403
- [ ] c. Đăng ký middleware trong `bootstrap/app.php`
- [ ] d. Bọc route quản trị (store/update/destroy) bằng middleware này
- [ ] e. Test tài khoản member gọi route admin, xác nhận nhận lỗi 403
- [ ] f. Export Postman Collection ra file JSON, lưu vào thư mục báo cáo
- **Xong khi:** bước e và f hoàn tất

### PHASE 4 — Frontend (React)

**25. Layout chung**
- [ ] a. Tạo thư mục `src/components`
- [ ] b. Tạo `Header.jsx` (logo + menu danh mục + tìm kiếm + nút đăng nhập)
- [ ] c. Tạo `Footer.jsx`
- [ ] d. `npm install react-router-dom`
- [ ] e. Tạo `Layout.jsx` bọc Header + `<Outlet />` + Footer
- [ ] f. Cấu hình `App.jsx` dùng `<BrowserRouter>`
- **Xong khi:** header/footer hiện trên mọi trang khi chạy `npm run dev`

**26. Trang chủ**
- [ ] a. Tạo `pages/Home.jsx`
- [ ] b. `useEffect` gọi API `?sort=hot`
- [ ] c. Gọi thêm `?sort=new` và game hay (3 khối riêng)
- [ ] d. Tạo `GameCard.jsx` (thumbnail + tên + lượt chơi)
- [ ] e. Map ra lưới `GameCard`, style CSS Grid
- **Xong khi:** trang chủ hiện đúng game thật theo 3 khối Hot/Mới/Hay

**27. Trang danh mục**
- [ ] a. Tạo route `/category/:slug`
- [ ] b. Tạo `CategoryPage.jsx`, lấy `slug` bằng `useParams()`
- [ ] c. Gọi API lọc theo category + `?page=`
- [ ] d. Thêm nút phân trang Trước/Sau
- **Xong khi:** chọn danh mục ra đúng game thuộc danh mục đó

**28. Trang chi tiết game + `<GamePlayer>`**
- [ ] a. Tạo route `/game/:slug`, `GameDetail.jsx`
- [ ] b. Gọi API lấy chi tiết game
- [ ] c. Tạo `GamePlayer.jsx`: nếu `url` là link ngoài → iframe link đó; nếu là file local → iframe trỏ file local
- [ ] d. Chèn `<GamePlayer url={game.play_url} />`
- **Xong khi:** bấm vào 1 game, chơi được ngay trên trang

**29. Đăng ký/đăng nhập + hồ sơ**
- [ ] a. Tạo `Register.jsx` — form + gọi API register
- [ ] b. Tạo `Login.jsx` — form + gọi API login, lưu token
- [ ] c. Tạo `AuthContext.jsx` lưu thông tin user, dùng chung toàn app
- [ ] d. Sửa `Header.jsx`: hiện tên/nút đăng xuất nếu đã đăng nhập
- [ ] e. Tạo `Profile.jsx` khung trống (chờ Phase 6)
- **Xong khi:** đăng nhập xong tên hiện trên header, đăng xuất được

**30. Admin — quản lý Game**
- [ ] a. Tạo route `/admin/games`, `GameList.jsx`
- [ ] b. Hiển thị bảng danh sách (tên, danh mục, trạng thái, nút sửa/xóa)
- [ ] c. Tạo `GameForm.jsx` — form thêm/sửa, input upload thumbnail
- [ ] d. Nối nút "Thêm" → mở form → submit gọi API store
- [ ] e. Nối nút "Sửa" → mở form pre-fill → submit gọi API update
- [ ] f. Nối nút "Xóa" → confirm → gọi API destroy
- **Xong khi:** thêm 1 game qua admin, thấy xuất hiện ngay ở trang chủ

**31. Admin — Category/User/Comment**
- [ ] a. Lặp cấu trúc nhiệm vụ 30 cho `/admin/categories`
- [ ] b. Tạo `/admin/users` — xem danh sách + đổi role/khóa tài khoản
- [ ] c. Tạo `/admin/comments` — danh sách + nút xóa (kiểm duyệt)
- **Xong khi:** quản lý được cả 3 nhóm dữ liệu qua giao diện admin

**32. Dọn dữ liệu giả**
- [ ] a. Tìm toàn bộ project từ khóa "mock" hoặc dữ liệu hardcode
- [ ] b. Xóa từng chỗ, thay bằng gọi API thật
- [ ] c. Test lại toàn bộ trang đã làm
- **Xong khi:** bước c xác nhận sạch, không còn dữ liệu giả

### PHASE 5 — Tích hợp nội dung game thật

**33. Build game Unity WebGL đã có**
- [ ] a. Mở project Unity của game đã có
- [ ] b. File → Build Settings → WebGL → Switch Platform
- [ ] c. Bấm Build, chọn thư mục output
- [ ] d. Copy thư mục build vào thư mục game tự host trong project
- [ ] e. Chạy server thật, mở `index.html` qua đó (không mở bằng `file://`)
- **Xong khi:** bước e game load và chơi được, không lỗi console

**34. Nhúng game từ GameDistribution**
- [ ] a. Tạo tài khoản publisher tại gamedistribution.com
- [ ] b. Duyệt catalog, chọn 3–5 game phù hợp (kiểm tra rating độ tuổi)
- [ ] c. Copy link embed dạng `https://embed.gamedistribution.com/{game-id}/` cho từng game
- [ ] d. Thêm từng game vào `/admin/games`, dán link vào `play_url`
- [ ] e. Kiểm tra lại trên trang chi tiết, xác nhận chơi được
- **Xong khi:** cả 3–5 game nhúng đều chơi được

**35. *(tuỳ chọn)* Tự host game mã nguồn mở**
- [ ] a. Tìm game HTML5 nhỏ license MIT trên GitHub
- [ ] b. Tải về, đặt vào thư mục game tự host
- [ ] c. Thêm vào admin với `play_url` là đường dẫn local
- **Xong khi:** (nếu làm) game này chơi được như game tự làm

**36. Test đa nền tảng**
- [ ] a. Test toàn bộ game trên Chrome
- [ ] b. Test lại trên Firefox
- [ ] c. Bật responsive mode trong DevTools, thử màn hình điện thoại
- [ ] d. Nếu có điện thoại thật, mở web thật thử luôn
- [ ] e. Ghi bảng: Tên game | Chrome | Firefox | Mobile | Ghi chú lỗi
- **Xong khi:** có bảng ghi chú đầy đủ, dùng cho phần kiểm thử

### PHASE 6 — Tính năng P1

**37. Yêu thích game**
- [ ] a. Thêm icon trái tim vào `GameCard.jsx` và `GameDetail.jsx`
- [ ] b. Gọi API toggle favorite khi bấm icon
- [ ] c. Đổi màu icon theo trạng thái đã yêu thích (lấy từ API khi load trang)
- [ ] d. Trong `Profile.jsx`, gọi API lấy danh sách game yêu thích, hiển thị ra
- **Xong khi:** bấm tim, load lại trang vẫn giữ đúng trạng thái

**38. Lịch sử đã chơi**
- [ ] a. Gọi API ghi log khi game bắt đầu load trong `GamePlayer.jsx`/`GameDetail.jsx`
- [ ] b. Trong `Profile.jsx`, gọi API lấy lịch sử, hiển thị sort theo thời gian mới nhất
- **Xong khi:** chơi 1 game xong, vào Profile thấy game đó ở đầu danh sách

**39. Bình luận**
- [ ] a. Thêm form bình luận vào `GameDetail.jsx` (chỉ hiện nếu đã đăng nhập)
- [ ] b. Gọi API store khi submit, load lại danh sách bình luận
- [ ] c. Hiển thị danh sách kèm tên người bình luận + thời gian
- [ ] d. Thêm nút xóa nếu bình luận là của chính mình
- **Xong khi:** gửi bình luận hiện ngay, xóa được bình luận của mình

**40. Tìm kiếm**
- [ ] a. Thêm ô input trong `Header.jsx`
- [ ] b. Khi submit, chuyển hướng tới `/search?q=...`
- [ ] c. Tạo `SearchResults.jsx`, gọi API search
- [ ] d. Hiển thị kết quả giống layout trang danh mục
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

---

## CHƯƠNG 1. TỔNG QUAN

**1.1. Lý do chọn đề tài**
- Xu hướng chơi game HTML5/WebGL trực tiếp trên trình duyệt, không cần cài đặt, chơi được trên cả mobile lẫn PC.
- Thị trường Việt Nam đã có các cổng game lớn (GameVui.vn, Y8, Friv...) nhưng sinh viên có thể xây một hệ thống thu nhỏ để nắm quy trình phân tích – thiết kế – triển khai một web platform thật.
- Cá nhân có nền tảng làm game (Unity, WebGL build cho Playworks) → có lợi thế tự sản xuất được một phần nội dung game thay vì chỉ tổng hợp.

**1.2. Mục tiêu của đề tài**
- Xây dựng website cho phép người dùng duyệt danh mục, tìm kiếm, chơi game ngay trên trình duyệt.
- Có hệ thống thành viên: lưu game yêu thích, lịch sử đã chơi, bình luận/đánh giá, bảng xếp hạng điểm số.
- Có trang quản trị (Admin CMS) để quản lý game, danh mục, tài khoản, bình luận, tin tức.

**1.3. Giới hạn và phạm vi đề tài**
- Phạm vi: 1 website chơi game (frontend) + 1 hệ thống quản trị (backend/CMS).
- Giới hạn nguồn game (chọn 1 hoặc kết hợp):
  - Game tự phát triển (Unity WebGL / Phaser.js) — khuyến nghị 2-3 game do chính mình làm để tránh vi phạm bản quyền và tạo điểm khác biệt.
  - Game HTML5 nguồn mở/miễn phí bản quyền (itch.io giấy phép mở, GameDistribution/CrazyGames SDK cho publisher — cần đăng ký đối tác, không "lấy trộm" nhúng iframe game của site khác).
- Không xử lý thanh toán thật (nếu có tính năng "VIP/không quảng cáo" thì chỉ mô phỏng).

**1.4. Kết quả dự kiến đạt được**
- Website hoàn chỉnh chạy được, có admin CMS, có tối thiểu 1 game tự làm được tích hợp thật (không phải placeholder).
- Báo cáo đầy đủ theo đúng khung chương mục bên dưới.

---

## CHƯƠNG 2. KIẾN THỨC NỀN TẢNG

**2.1. Cơ sở lý thuyết**
- 2.1.1. Kiến trúc website hiện đại (mô hình client–server, RESTful API, SPA)
- 2.1.2. CSS
- 2.1.3. HTML5 (đặc biệt Canvas/WebGL — nền tảng để chạy game trong trình duyệt)

**2.2. Công cụ sử dụng**
- 2.2.1. React.js (giữ nguyên như mẫu — frontend)
- 2.2.2. Framework Laravel (giữ nguyên — backend API)
- 2.2.3. MySQL (giữ nguyên — CSDL)
- 2.2.4. *(Thêm mới)* Unity WebGL / Phaser.js — công cụ dựng game nhúng vào web

> Giữ nguyên stack Laravel + React + MySQL để đúng khung mẫu trường yêu cầu. Nếu muốn đổi (VD Node.js/Express, Vue, .NET vì bro quen C#) mình chỉnh lại được — cứ nói.

---

## CHƯƠNG 3. PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

**3.1. Khảo sát hệ thống**
- 3.1.1. Tổng quan hệ thống — khảo sát GameVui.vn, Y8.com, Friv.com
- 3.1.2. Đánh giá hiện trạng
- 3.1.3. Xác định yêu cầu hệ thống
- 3.1.4. Kế hoạch thực hiện

**3.2. Phân tích hệ thống**

*3.2.1. Xác định tác nhân (Actor) và chức năng (Usecase)*

| Actor | Usecase chính |
|---|---|
| Khách (Guest) | Xem danh sách game, Tìm kiếm game, Chơi game, Xem bảng xếp hạng, Đăng ký/Đăng nhập |
| Thành viên (Member) | (kế thừa Guest) + Yêu thích game, Bình luận, Đánh giá game, Xem lịch sử đã chơi, Cập nhật hồ sơ, Gửi phản hồi/báo lỗi |
| Quản trị viên (Admin) | Quản lý game (CRUD), Quản lý danh mục (CRUD), Quản lý tài khoản, Duyệt/xóa bình luận, Quản lý tin tức, Xử lý phản hồi, Thống kê lượt chơi |

*3.2.2. Biểu đồ UseCase* — thay thế lần lượt các hình trong mẫu:
- Usecase tổng quát
- Usecase quản lý game *(thay "quản lý sản phẩm")*
- Usecase quản lý tài khoản
- Usecase quản lý danh mục
- Usecase quản lý bình luận/đánh giá *(thay "quản lý phản hồi")*
- Usecase chơi game *(thay "đặt hàng")*
- Usecase yêu thích game *(giữ như mẫu — "sản phẩm yêu thích")*
- Usecase quản lý tin tức/sự kiện
- Usecase gửi phản hồi/báo lỗi
- Usecase xem bảng xếp hạng *(mới, không có trong mẫu)*

*3.2.3. Biểu đồ hoạt động* — CRUD game/danh mục/tài khoản/tin tức + luồng chơi game + luồng đăng ký/đăng nhập.

*3.2.4. Biểu đồ trình tự* — tương ứng từng usecase ở trên (thêm/sửa/xóa game, đăng nhập, chơi game, bình luận...).

*3.2.5. Biểu đồ lớp*

**3.3. Thiết kế hệ thống**
- 3.3.1. Thiết kế tổng thể (sơ đồ kiến trúc hệ thống, sơ đồ CSDL/ERD)
- 3.3.2. Thiết kế chi tiết (wireframe từng màn hình: trang chủ, trang danh mục, trang chơi game, trang admin)

**Đề xuất CSDL** *(thay bảng user/category/product/customer/order... của mẫu)*:

| Bảng | Mô tả |
|---|---|
| `users` | Tài khoản (id, username, email, password, avatar, role) |
| `games` | Game (id, name, slug, thumbnail, play_url/file_path, description, play_count, age_rating, status) |
| `categories` | Danh mục (id, name, slug, icon) |
| `game_category` | Bảng trung gian nhiều-nhiều (1 game thuộc nhiều danh mục, giống GameVui) |
| `comments` | Bình luận (id, game_id, user_id, content, created_at) |
| `ratings` | Đánh giá sao (id, game_id, user_id, score) |
| `favorites` | Game yêu thích (id, user_id, game_id) |
| `play_history` | Lịch sử chơi — phục vụ mục "Đã chơi gần đây" (id, user_id, game_id, played_at) |
| `leaderboard` | Điểm số cao nhất — phục vụ "Đấu trường" (id, game_id, user_id, score, achieved_at) |
| `news` | Tin tức/sự kiện (id, title, content, thumbnail) |
| `feedback` | Báo lỗi/góp ý (id, user_id, content, status) |

**Biểu đồ trạng thái** *(thay "trạng thái đơn hàng" / "trạng thái đăng nhập")*:
- Biểu đồ trạng thái tài khoản (chờ kích hoạt → hoạt động → khóa)
- Biểu đồ trạng thái game (nháp → chờ duyệt → đã đăng → ẩn)
- Biểu đồ trạng thái đăng nhập (giữ như mẫu)

---

## CHƯƠNG 4. XÂY DỰNG CHƯƠNG TRÌNH

**4.1. Cài đặt**
- 4.1.1. Hệ thống lưu trữ — nơi chứa file game (WebGL build, thumbnail), có thể local storage hoặc cloud (S3/Cloudinary)
- 4.1.2. Công cụ sử dụng (VS Code, XAMPP/Docker, Postman, Git)
- 4.1.3. Một số mã nguồn chính (API chơi game, API bình luận, tích hợp Unity WebGL build vào iframe/React component)

**4.2. Kiểm thử**
- 4.2.1. Kiểm thử đơn vị
- 4.2.2. Kiểm thử tích hợp (đặc biệt: test game load đúng trên các trình duyệt/thiết bị khác nhau)

---

## KẾT LUẬN
## TÀI LIỆU THAM KHẢO

---

## Gợi ý riêng cho bro

1. **Tận dụng nền WebGL sẵn có**: Unity build ra WebGL đã quen tay (từ VRTB) — hoàn toàn nhúng được vào React qua `<iframe>` hoặc unity-webgl loader. Có thể tự làm 1-2 mini-game demo để làm điểm nhấn "tự phát triển nội dung" thay vì chỉ CRUD game người khác.
2. **Vấn đề bản quyền game**: nếu muốn có nhiều game để site "đầy" như GameVui thật, nên dùng SDK của các publisher cho phép nhúng hợp pháp (GameDistribution, CrazyGames Developer Program) — tránh scrape/nhúng trực tiếp game từ site khác vì vi phạm bản quyền và dễ bị hội đồng chấm hỏi.
3. **Điểm nhấn kỹ thuật** để đồ án không bị đánh giá là "clone": có thể thêm hệ thống thành tích (achievement), leaderboard theo tuần/tháng, hoặc gợi ý game bằng lịch sử chơi — những thứ mẫu web bán hàng không có.

---

## KẾ HOẠCH THỰC HIỆN CHI TIẾT (dành cho làm một mình)

### 1. Phân loại tính năng theo mức ưu tiên

**P0 — Bắt buộc phải xong (không có thì đồ án không hoàn chỉnh):**
- [ ] Trang chủ hiển thị danh mục + danh sách game
- [ ] Trang chi tiết game, chơi được game ngay trên trình duyệt
- [ ] Đăng ký / đăng nhập / đăng xuất
- [ ] Admin CRUD Game
- [ ] Admin CRUD Danh mục
- [ ] Tối thiểu 2–3 game hoạt động thật (khuyến khích ít nhất 1 game tự build WebGL)

**P1 — Nên có (tăng điểm, chi phí công sức vừa phải):**
- [ ] Yêu thích game (favorites)
- [ ] Lịch sử đã chơi
- [ ] Bình luận game (rating sao có thể bỏ nếu thiếu thời gian)
- [ ] Tìm kiếm game theo tên

**P2 — Điểm cộng, chỉ làm nếu còn dư thời gian:**
- [ ] Bảng xếp hạng / Đấu trường
- [ ] Trang tin tức / sự kiện
- [ ] Trang phản hồi/báo lỗi riêng biệt (gộp chung vào bình luận cũng được)
- [ ] Đánh giá sao (rating) tách riêng khỏi bình luận

> Nguyên tắc: làm xong toàn bộ P0 trước, demo chạy được cả luồng chính, rồi mới quay lại P1/P2. Không dàn trải sang P2 khi P0 chưa xong — hội đồng chấm luồng chính chạy mượt sẽ có lợi hơn nhiều tính năng dở dang.

### 2. Rút gọn khối lượng vẽ biểu đồ (so với mẫu ~48 hình)

Mẫu gốc vẽ riêng usecase + activity + sequence cho TỪNG module (tài khoản, danh mục, tin tức, sản phẩm, giỏ hàng, đơn hàng...). Làm một mình theo đúng số lượng đó sẽ rất mất thời gian. Cách rút gọn vẫn hợp lệ về học thuật:

- **Nhóm các module CRUD giống nhau** (Danh mục, Tin tức, Tài khoản): chỉ vẽ đầy đủ 1 bộ sequence/activity "CRUD chuẩn" cho 1 module đại diện, các module còn lại ghi chú "quy trình tương tự, tham chiếu Hình 3.x" thay vì vẽ lại từ đầu.
- **Chỉ vẽ chi tiết riêng cho các luồng thực sự khác biệt về logic**: Chơi game, Đăng ký/Đăng nhập, Bình luận & Đánh giá, Yêu thích game, Xếp hạng.
- Ước tính: từ ~48 hình có thể rút xuống còn khoảng **18–22 hình** mà vẫn giữ đúng cấu trúc chương 3, giảm hơn nửa khối lượng vẽ.

### 3. Lộ trình theo tuần (giả định học kỳ ~14 tuần, làm một mình)

| Tuần | Mục tiêu | Công việc chính |
|---|---|---|
| 1–2 | Chương 1 + chốt phạm vi | Viết lý do chọn đề tài, mục tiêu, khảo sát nhanh 2–3 site game tương tự; chốt danh sách P0/P1/P2 |
| 3 | Chương 2 | Viết cơ sở lý thuyết + công cụ; dựng khung project Laravel API + React chạy rỗng |
| 4–5 | Chương 3.1–3.2 | Actor/Usecase, vẽ usecase tổng quát + các usecase P0, viết đặc tả usecase |
| 6 | Chương 3.3 | ERD, sơ đồ kiến trúc, wireframe các trang chính |
| 7–8 | Backend P0 | Migration DB, API Auth, API Game CRUD, API Category CRUD |
| 9–10 | Frontend P0 | Trang chủ, trang danh mục, trang chơi game, giao diện admin CRUD |
| 11 | Tích hợp game thật | Build/nhúng game WebGL tự làm + game nguồn hợp lệ khác |
| 12 | P1 | Yêu thích, lịch sử, bình luận, tìm kiếm |
| 13 | Kiểm thử | Unit test API chính, test luồng chơi game trên nhiều trình duyệt |
| 14 | Hoàn thiện | Viết kết luận, hoàn thiện báo cáo, chuẩn bị slide bảo vệ |

*(Học kỳ dài/ngắn hơn thì co giãn theo tỉ lệ — khối P0 luôn nên chiếm khoảng 60% tổng thời gian.)*

### 4. Checklist kỹ thuật tổng hợp (để tick dần khi làm)

**Backend (Laravel)**
- [ ] Setup project, kết nối MySQL
- [ ] Migration: `users`, `games`, `categories`, `game_category`, `comments`, `favorites`, `play_history`
- [ ] Auth API (đăng ký/đăng nhập — Sanctum hoặc JWT)
- [ ] API CRUD Game (kèm upload thumbnail + file/link game)
- [ ] API CRUD Category
- [ ] API Comment, Favorite, Play History
- [ ] Middleware phân quyền Admin/Member

**Frontend (React)**
- [ ] Layout chung (header danh mục, footer)
- [ ] Trang chủ (Game hot/mới/hay — bố cục kiểu GameVui)
- [ ] Trang danh mục (lọc theo category)
- [ ] Trang chi tiết game + khung chơi game (iframe/WebGL loader)
- [ ] Trang đăng ký/đăng nhập, trang hồ sơ (yêu thích, lịch sử)
- [ ] Trang admin: quản lý game, danh mục, tài khoản, bình luận

**Tích hợp game**
- [ ] Build ít nhất 1 game Unity WebGL của chính mình, test load trên web
- [ ] Chuẩn hóa component nhúng game dùng chung cho mọi loại nguồn (WebGL, iframe, Phaser)

---

## NGUỒN GAME HỢP PHÁP ĐỂ LÀM PHONG PHÚ KHO GAME

Đã có 1 game tự làm rồi (WebGL) — dưới đây là các nguồn bổ sung, xếp theo độ dễ triển khai:

**1. GameDistribution (dễ nhất, khuyến nghị chính)**
- Cách làm: duyệt catalog trên gamedistribution.com, chọn game, lấy link nhúng dạng `https://embed.gamedistribution.com/?url=...` rồi bỏ vào `<iframe>`.
- Không cần tự host file game, không cần duyệt phức tạp cho việc nhúng iframe cơ bản (Direct Game Integration).
- Có sẵn SDK riêng cho cả HTML5, Unity WebGL, Construct nếu sau này muốn tích hợp sâu hơn (tracking, quảng cáo).

**2. GamePix — chương trình Affiliate**
- Đăng ký GamePix Dashboard, tích hợp qua embed trực tiếp, JSON API (lấy danh sách game để hiển thị động), hoặc trang white-label dựng sẵn.
- Phù hợp nếu muốn tự động hóa việc hiển thị danh sách game từ API thay vì thêm tay từng game.

**3. Famobi — cân nhắc**
- Có catalog game chất lượng cao, nhưng gói affiliate miễn phí yêu cầu tối thiểu khoảng 50.000 lượt truy cập/tháng mới đủ điều kiện đăng ký — web đồ án mới ra mắt khó đạt, nên xếp sau 2 nguồn trên.

**4. itch.io — dùng được nhưng phải lọc kỹ**
- Về mặt kỹ thuật, game HTML5 trên itch.io mặc định nhúng được qua embed code hoặc URL trực tiếp.
- Nhưng về pháp lý: chỉ nên lấy game có gắn giấy phép mở (CC0, MIT...) hoặc đã xin phép tác giả — game không ghi rõ giấy phép thì coi như "giữ toàn quyền", không tự ý nhúng.
- Trong báo cáo nên ghi rõ tên game + tác giả + link license cho từng game lấy từ đây.

**5. Mã nguồn mở GitHub (an toàn nhất cho báo cáo học thuật)**
- Tìm game HTML5 nhỏ (2048, Flappy Bird clone, Snake, breakout...) có license MIT/Apache, tự host trong project React → không phụ thuộc bên thứ ba, có thể trích dẫn rõ nguồn + license trong tài liệu tham khảo.
- Kết hợp asset miễn phí từ **Kenney.nl** (CC0) nếu muốn tự làm thêm 1-2 game bằng Phaser cho đa dạng.

**Gợi ý phối hợp cho đồ án:**
- 1 game Unity WebGL tự làm (đã có) — điểm nhấn "tự phát triển".
- 3-5 game từ GameDistribution (nhúng nhanh, uy tín) — làm đầy kho game.
- 1-2 game mã nguồn mở tự host — thể hiện đa dạng kỹ thuật tích hợp trong Chương 4 (vừa nhúng iframe bên thứ ba, vừa tự host).
- Trường dữ liệu `play_url` trong bảng `games` đã thiết kế sẵn để chứa cả 2 dạng (link nhúng ngoài hoặc đường dẫn file tự host) — không cần đổi schema.

---

Muốn mình triển khai chi tiết phần nào trước — viết code thật cho Phase 0-3, vẽ sơ đồ ERD, hay dựng component `<GamePlayer>` React?
