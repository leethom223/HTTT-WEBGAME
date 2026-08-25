# ĐỒ ÁN TỐT NGHIỆP HỆ THỐNG THÔNG TIN
# CHƯƠNG 3. PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

---

## 3.1. KHẢO SÁT HỆ THỐNG

### 3.1.1. Khảo sát các hệ thống cổng game thực tế

Nhằm xây dựng một nền tảng cổng game trực tuyến vừa đáp ứng nhu cầu thực tiễn của người dùng, vừa đảm bảo tính khả thi về mặt kỹ thuật, đề tài tiến hành khảo sát và đánh giá 3 cổng trò chơi trực tuyến phổ biến hàng đầu hiện nay:

1.  **Cổng game GameVui.vn (Việt Nam)**:
    *   *Đặc điểm giao diện*: Bố cục nhiều màu sắc, phân chia danh mục rất chi tiết (Game 2 người, Game bạn gái, Game hành động, Game trí tuệ).
    *   *Tính năng nổi bật*: Chơi game trực tiếp trên web, tìm kiếm nhanh, hệ thống bình luận dưới mỗi game, bảng xếp hạng game hot trong tuần.
    *   *Hạn chế*: Chứa mật độ quảng cáo (Banner/Video Ads) khá dày đặc, gây gián đoạn trải nghiệm và làm chậm tốc độ tải trang trên thiết bị di động yếu.

2.  **Cổng game Y8.com (Quốc tế)**:
    *   *Đặc điểm giao diện*: Hỗ trợ đa ngôn ngữ, hệ thống thẻ tag phong phú, phân loại game theo công nghệ (HTML5, WebGL, Flash giả lập).
    *   *Tính năng nổi bật*: Lưu trữ tiến trình chơi, lưu danh sách yêu thích, hệ thống tài khoản thành viên với điểm thành tích (Achievements).
    *   *Hạn chế*: Kiến trúc hệ thống phức tạp do tích hợp nhiều công nghệ cũ kế thừa từ kỷ nguyên Flash, giao diện chưa thực sự tối ưu cho trải nghiệm cảm ứng trên màn hình dọc smartphone.

3.  **Cổng game Friv.com**:
    *   *Đặc điểm giao diện*: Triết lý thiết kế tối giản (Minimal Grid UI) — toàn bộ trang chủ là lưới các biểu tượng game, nhấp vào là chơi ngay lập tức (Instant Play).
    *   *Tính năng nổi bật*: Tốc độ tải cực nhanh, không đòi hỏi đăng ký phức tạp.
    *   *Hạn chế*: Thiếu các tính năng tương tác mạng xã hội, không có hệ thống bình luận, đánh giá sao hay lưu trữ dữ liệu cá nhân hóa người dùng.

#### Bảng so sánh tổng hợp các hệ thống khảo sát:

| Tiêu chí | GameVui.vn | Y8.com | Friv.com | Hệ thống đề tài đề xuất |
| :--- | :--- | :--- | :--- | :--- |
| **Giao diện & Chủ đề** | Đa sắc màu, truyền thống | Tối màu, nhiều menu | Lưới icon tối giản | Dark Theme Gaming hiện đại, Responsive |
| **Tốc độ tải trang** | Trung bình (nhiều ads) | Khá | Rất nhanh | Nhanh (Kiến trúc SPA + Lazy Loading) |
| **Hệ thống thành viên** | Có | Đầy đủ | Không có | Xác thực Token Sanctum, Profile cá nhân |
| **Tương tác cộng đồng** | Bình luận, đánh giá | Đánh giá, lưu game | Không | Bình luận, Yêu thích, Đánh giá sao 1-5 |
| **Nguồn & Công nghệ** | HTML5 / Nhúng ngoài | HTML5 / WebGL | HTML5 | HTML5 + WebGL 3D (Unity tự làm + Embed) |
| **Phân quyền Quản trị** | Khép kín | Khép kín | Khép kín | Admin CMS độc lập (CRUD Game, Category) |

---

### 3.1.2. Đánh giá hiện trạng & Định hướng giải pháp cho đề tài

Từ quá trình khảo sát thực tế, đề tài rút ra các định hướng then chốt trong thiết kế hệ thống:
1.  **Trải nghiệm người dùng là ưu tiên hàng đầu**: Xây dựng giao diện phong cách Dark Theme hiện đại, không chèn quảng cáo gây phiền toái, tốc độ tải trang nhanh và thích ứng linh hoạt (Mobile-First Responsive) trên mọi thiết bị.
2.  **Áp dụng kiến trúc hiện đại (Decoupled Architecture)**: Tách biệt hoàn toàn Frontend (React 19 SPA) và Backend (Laravel 11 RESTful API) giúp hệ thống nhẹ, độc lập và dễ dàng mở rộng thêm ứng dụng mobile trong tương lai.
3.  **Minh bạch nguồn gốc nội dung trò chơi**: Kết hợp giữa các tựa game HTML5 phân phối hợp pháp (GameDistribution SDK, mã nguồn mở MIT) và tối thiểu 01 tựa game do chính tác giả tự xây dựng bằng Unity xuất bản WebGL.

---

### 3.1.3. Xác định yêu cầu hệ thống

#### A. Yêu cầu chức năng (Functional Requirements):
*   **Nhóm tính năng P0 (Cốt lõi - Bắt buộc hoàn thành)**:
    *   *Duyệt & Tìm kiếm game*: Hiển thị danh sách game theo danh mục (Trí tuệ, Hành động, Đua xe, Arcade...), lọc game Hot/Mới, tìm kiếm theo tên.
    *   *Khung chơi game (`<GamePlayer />`)*: Tải và chạy mượt mà game WebGL và game HTML5 trong iframe có hỗ trợ toàn màn hình (Fullscreen).
    *   *Xác thực người dùng (Authentication)*: Đăng ký tài khoản, Đăng nhập, Đăng xuất an toàn bằng cơ chế Token (Laravel Sanctum).
    *   *Quản trị danh mục (Admin Category CRUD)*: Thêm, Sửa, Xóa danh mục trò chơi.
    *   *Quản trị trò chơi (Admin Game CRUD)*: Thêm mới game (tải thumbnail, nhập URL nhúng/file game), Sửa thông tin, Xóa hoặc Ẩn/Hiện game.

*   **Nhóm tính năng P1 (Nâng cao - Tăng trải nghiệm)**:
    *   *Yêu thích game (Favorites)*: Cho phép thành viên bấm tim lưu game yêu thích và xem lại trong trang cá nhân.
    *   *Lịch sử chơi (Play History)*: Tự động ghi nhận danh sách các trò chơi đã trải nghiệm gần đây.
    *   *Bình luận & Đánh giá (Comments & Ratings)*: Gửi nhận xét đánh giá chất lượng game, chấm điểm sao từ 1 đến 5.

*   **Nhóm tính năng P2 (Mở rộng - Điểm cộng)**:
    *   *Bảng xếp hạng (Leaderboard)*: Ghi nhận điểm số cao nhất của người chơi.
    *   *Báo lỗi / Góp ý (Feedback)*: Gửi thông báo lỗi game về cho Admin xử lý.
    *   *Quản lý tin tức / Sự kiện (News & Events)*: Cập nhật thông tin các sự kiện game mới.

#### B. Yêu cầu phi chức năng (Non-Functional Requirements):
*   **Hiệu năng (Performance)**: Thời gian phản hồi API Backend < 200ms đối với các truy vấn dữ liệu chuẩn. Frontend tải trang ban đầu < 2 giây nhờ cơ chế code-splitting của Vite.
*   **Bảo mật (Security)**:
    *   Mật khẩu người dùng được băm an toàn bằng thuật toán `Bcrypt`.
    *   Bảo vệ toàn bộ API quản trị bằng Middleware phân quyền `IsAdmin` và xác thực Sanctum Token.
    *   Phòng chống các lỗ hổng web phổ biến: SQL Injection, XSS, CORS Policy.
*   **Khả năng mở rộng & Tương thích**: Tương thích tốt trên các trình duyệt hiện đại (Google Chrome, Edge, Firefox, Safari) và các tỷ lệ màn hình Desktop, Laptop, Tablet, Mobile.

---

### 3.1.4. Kế hoạch thực hiện (Lộ trình 14 tuần)

| Tuần | Giai đoạn | Nội dung công việc chi tiết | Kết quả bàn giao |
| :---: | :--- | :--- | :--- |
| **1–2** | Chuẩn bị & Khảo sát | Chọn đề tài, khảo sát GameVui/Y8, chốt danh sách tính năng P0/P1/P2 | Đề cương chi tiết, Chương 1 |
| **3** | Cơ sở lý thuyết | Viết Chương 2, dựng khung dự án Laravel API + React Vite | Chương 2, Môi trường Phase 0 |
| **4–5** | Phân tích hệ thống | Xác định Actor, vẽ UseCase diagrams, viết bảng đặc tả UseCase | Biểu đồ & Đặc tả UseCase |
| **6** | Thiết kế hệ thống | Thiết kế CSDL (ERD), Data Dictionary, vẽ Wireframe giao diện | Sơ đồ ERD, Wireframes, Chương 3 |
| **7–8** | Xây dựng Backend | Viết Migration, Seed data, API Auth Sanctum, API CRUD Game/Category | Bộ RESTful API Backend |
| **9–10**| Xây dựng Frontend | Xây dựng Layout, Trang chủ, Trang danh mục, Component GamePlayer, Admin | Giao diện React SPA |
| **11** | Tích hợp Game | Build game Unity WebGL, nhúng game GameDistribution & Open Source | Kho game thực tế hoạt động |
| **12** | Tính năng P1 | Hoàn thiện Yêu thích, Lịch sử chơi, Bình luận, Đánh giá sao | Các tính năng P1 hoàn chỉnh |
| **13** | Kiểm thử hệ thống | Viết Unit Test API, kiểm thử tích hợp luồng người dùng và đa trình duyệt | Kết quả kiểm thử (Chương 4) |
| **14** | Hoàn thiện & Bảo vệ | Soạn kết luận, chỉnh sửa format báo cáo Word, làm slide bảo vệ | Quyển báo cáo & Slide bảo vệ |


---

## 3.2. PHÂN TÍCH HỆ THỐNG

### 3.2.1. Xác định tác nhân (Actors) và Usecase

Hệ thống có 3 tác nhân chính tham gia tương tác:

1.  **Khách (Guest - Người dùng vãng lai)**:
    *   Xem danh sách trò chơi theo danh mục, độ hot, độ mới.
    *   Tìm kiếm trò chơi theo từ khóa.
    *   Xem thông tin chi tiết và chơi trò chơi trực tiếp trên trình duyệt.
    *   Xem điểm đánh giá và bình luận cộng đồng.
    *   Đăng ký tài khoản mới / Đăng nhập hệ thống.
2.  **Thành viên (Member - Đã đăng nhập)**:
    *   *Kế thừa toàn bộ quyền của Khách*.
    *   Thêm / Xóa trò chơi vào danh sách Yêu thích (Favorites).
    *   Tự động lưu và xem lại Lịch sử các game đã chơi gần đây (Play History).
    *   Gửi bình luận và xóa bình luận của chính mình.
    *   Chấm điểm đánh giá sao (Rating 1-5 sao) cho trò chơi.
    *   Cập nhật thông tin hồ sơ cá nhân (Tên hiển thị, Avatar, Đổi mật khẩu).
3.  **Quản trị viên (Admin)**:
    *   Đăng nhập trang quản trị chuyên biệt.
    *   Quản lý danh mục trò chơi (CRUD Category).
    *   Quản lý kho trò chơi (CRUD Game, tải thumbnail, cấu hình link WebGL/iFrame).
    *   Quản lý tài khoản người dùng (Xem danh sách, Khóa/Mở khóa, Phân quyền Role).
    *   Kiểm duyệt và xóa các bình luận vi phạm tiêu chuẩn cộng đồng.
    *   Xem thống kê hệ thống (Tổng lượt chơi, số lượng game, thành viên).

---

### 3.2.2. Biểu đồ UseCase (Usecase Diagrams)

#### A. Biểu đồ UseCase Tổng quát hệ thống:

```
+----------------------------------------------------------------------------------+
|                             HỆ THỐNG CỔNG GAME TRỰC TUYẾN                        |
|                                                                                  |
|       +--------------+           (Xem danh sách game)                            |
|       |              | ---------------------------------------> (( UC01 ))       |
|       |              |           (Tìm kiếm game)                                 |
|       |    KHÁCH     | ---------------------------------------> (( UC02 ))       |
|       |   (Guest)    |           (Chơi game trực tiếp)                           |
|       |              | ---------------------------------------> (( UC03 ))       |
|       |              |           (Đăng ký / Đăng nhập)                           |
|       +-------+------+ ---------------------------------------> (( UC04 ))       |
|               ^                                                                  |
|               | (Kế thừa)        (Yêu thích game)                                |
|       +-------+------+ ---------------------------------------> (( UC05 ))       |
|       |              |           (Bình luận & Đánh giá)                          |
|       |  THÀNH VIÊN  | ---------------------------------------> (( UC06 ))       |
|       |   (Member)   |           (Xem lịch sử đã chơi)                           |
|       |              | ---------------------------------------> (( UC07 ))       |
|       +--------------+                                                           |
|                                                                                  |
|                                  (Quản lý Game - CRUD)                           |
|       +--------------+ ---------------------------------------> (( UC08 ))       |
|       |              |           (Quản lý Danh mục - CRUD)                       |
|       |  ADMIN CMS   | ---------------------------------------> (( UC09 ))       |
|       |   (Admin)    |           (Quản lý Tài khoản)                             |
|       |              | ---------------------------------------> (( UC10 ))       |
|       |              |           (Kiểm duyệt Bình luận)                          |
|       +--------------+ ---------------------------------------> (( UC11 ))       |
+----------------------------------------------------------------------------------+
```

---

### 3.2.3. Đặc tả Usecase chi tiết (Usecase Specifications)

#### Đặc tả UC01: Chơi game trực tuyến (Play Game)
*   **Mục tiêu**: Cho phép người chơi trải nghiệm trò chơi ngay trên trình duyệt mà không cần cài đặt.
*   **Tác nhân**: Khách (Guest), Thành viên (Member).
*   **Điều kiện tiên quyết**: Người dùng đã truy cập vào website và chọn một tựa game cụ thể.
*   **Luồng sự kiện chính (Main Flow)**:
    1. Người dùng nhấp vào thẻ game trên trang chủ hoặc trang danh mục.
    2. Hệ thống chuyển hướng đến trang chi tiết game (`/game/:slug`).
    3. Frontend gửi request `GET /api/games/{slug}` lên server.
    4. Backend trả về thông tin game, tăng biến đếm `play_count` lên 1 và trả về đường dẫn `play_url`.
    5. Component `<GamePlayer />` nhúng và khởi tạo khung game (`<iframe />` hoặc Canvas WebGL).
    6. Trò chơi tải hoàn tất và người dùng bắt đầu chơi.
*   **Luồng phụ (Alternative Flow)**:
    *   *Nếu là Thành viên đã đăng nhập*: Hệ thống tự động ghi một bản ghi vào bảng `play_history` để lưu lại thời điểm chơi.
    *   *Nếu đường dẫn game bị lỗi*: Hệ thống hiển thị thông báo "Trò chơi đang bảo trì" và gợi ý các game liên quan.
*   **Hậu điều kiện**: Lượt chơi của game tăng lên, game xuất hiện trong lịch sử chơi của thành viên.

#### Đặc tả UC02: Đăng ký & Đăng nhập (Authentication)
*   **Mục tiêu**: Cung cấp tài khoản định danh để người dùng sử dụng các tính năng thành viên.
*   **Tác nhân**: Khách (Guest).
*   **Điều kiện tiên quyết**: Khách chưa đăng nhập vào hệ thống.
*   **Luồng sự kiện chính (Main Flow)**:
    1. Người dùng nhấn nút "Đăng nhập" và chọn "Đăng ký" nếu chưa có tài khoản.
    2. Người dùng nhập: `username`, `email`, `password`, `password_confirmation`.
    3. Frontend validate dữ liệu sơ bộ và gửi request `POST /api/register`.
    4. Backend kiểm tra tính duy nhất của email/username, mã hóa mật khẩu bằng `Bcrypt`, lưu vào bảng `users`.
    5. Backend sinh Token Sanctum và trả về cho Client kèm thông tin User.
    6. Frontend lưu Token vào `localStorage` / `AuthContext` và chuyển trạng thái giao diện sang "Đã đăng nhập".
*   **Hậu điều kiện**: Người dùng có tài khoản hợp lệ và phiên làm việc được duy trì qua Token.

#### Đặc tả UC03: Quản lý Game (CRUD Game - Admin)
*   **Mục tiêu**: Cho phép Quản trị viên thêm mới, cập nhật thông tin, thay đổi ảnh đại diện và xóa trò chơi khỏi hệ thống.
*   **Tác nhân**: Quản trị viên (Admin).
*   **Điều kiện tiên quyết**: Quản trị viên đã đăng nhập với tài khoản có `role = 'admin'`.
*   **Luồng sự kiện chính (Main Flow - Thêm mới Game)**:
    1. Admin truy cập trang `/admin/games` và nhấn nút "Thêm Game Mới".
    2. Admin điền các trường: Tên game, Danh mục (chọn nhiều), Mô tả, Hướng dẫn phím, `play_url` (link nhúng hoặc file upload), tải lên file ảnh `thumbnail`.
    3. Nhấn "Lưu trò chơi", Frontend gửi `POST /api/admin/games` dạng `multipart/form-data` kèm Token xác thực trong Header (`Authorization: Bearer <token>`).
    4. Middleware `IsAdmin` kiểm tra quyền của Admin.
    5. Controller lưu file thumbnail vào thư mục lưu trữ `storage/app/public/thumbnails`, tạo bản ghi trong bảng `games` và tạo liên kết trong bảng `game_category`.
    6. Hệ thống phản hồi mã 201 Created và cập nhật lại danh sách game trên giao diện Admin.
*   **Hậu điều kiện**: Game mới xuất hiện ngay lập tức trên trang chủ người dùng.


---

### 3.2.4. Biểu đồ hoạt động (Activity Diagrams)

#### A. Luồng Đăng nhập tài khoản:
```
  [Bắt đầu]
      |
      v
  (Nhập Email / Username & Password)
      |
      v
  (Frontend Validate cú pháp) ---> [Không hợp lệ] ---> (Báo lỗi tại form) ---> (Nhập lại)
      |
      | (Hợp lệ)
      v
  (Gửi POST /api/login lên Server)
      |
      v
  <Kiểm tra thông tin với CSDL>
      |
      +---> [Sai mật khẩu/Email] ---> (Trả về mã lỗi 401) ---> (Hiển thị "Sai thông tin")
      |
      +---> [Chính xác]
                |
                v
          (Tạo Sanctum Access Token)
                |
                v
          (Lưu Token vào LocalStorage Client)
                |
                v
          (Cập nhật UI Header: Tên & Avatar)
                |
                v
            [Kết thúc]
```

#### B. Luồng Chơi game và Tự động ghi Lịch sử:
```
  [Bắt đầu]
      |
      v
  (Người dùng nhấp chọn Game)
      |
      v
  (Chuyển hướng đến /game/:slug)
      |
      v
  (Gọi API GET /api/games/:slug)
      |
      v
  (Server tăng play_count + 1)
      |
      v
  <Kiểm tra trạng thái đăng nhập>
      |
      +---> [Đã đăng nhập] ---> (Ghi nhận bản ghi vào bảng play_history)
      |                                  |
      +---> [Chưa đăng nhập (Khách)] ----+
                                         |
                                         v
                            (Khởi tạo <GamePlayer />)
                                         |
                                         v
                            (Tải mã WebGL / iFrame Game)
                                         |
                                         v
                            (Người dùng bắt đầu chơi)
                                         |
                                         v
                                     [Kết thúc]
```

---

### 3.2.5. Biểu đồ tuần tự (Sequence Diagrams)

#### A. Biểu đồ tuần tự Đăng nhập hệ thống (User Login):

```
User (Browser)        React Frontend           AuthController          Sanctum/User Model        MySQL Database
     |                       |                        |                         |                      |
     |--- 1. Nhập Form ----->|                        |                         |                      |
     |    (Email, Pass)      |                        |                         |                      |
     |                       |--- 2. POST /api/login->|                         |                      |
     |                       |    (JSON payload)      |                         |                      |
     |                       |                        |--- 3. Truy vấn User --->|                      |
     |                       |                        |    theo Email           |--- 4. SELECT * ----->|
     |                       |                        |                         |<-- 5. User Record ---|
     |                       |                        |--- 6. Hash::check() --->|                      |
     |                       |                        |<-- 7. Password Match --|                      |
     |                       |                        |                         |                      |
     |                       |                        |--- 8. createToken() --->|                      |
     |                       |                        |<-- 9. PlainTextToken ---|                      |
     |                       |<-- 10. JSON Response --|                         |                      |
     |                       |    (Token + User Info) |                         |                      |
     |<-- 11. Lưu Token & ---|                        |                         |                      |
     |    Render Header UI   |                        |                         |                      |
```

#### B. Biểu đồ tuần tự Thêm Game mới (Admin Create Game):

```
Admin (Browser)       Admin GameForm           GameController           Storage/FileDisk         MySQL Database
     |                       |                        |                         |                      |
     |--- 1. Điền Form & --->|                        |                         |                      |
     |    Chọn Thumbnail     |                        |                         |                      |
     |                       |--- 2. POST /api/games >|                         |                      |
     |                       |    (multipart/form)    |                         |                      |
     |                       |                        |--- 3. Validate data --->|                      |
     |                       |                        |--- 4. Store Thumbnail ->|                      |
     |                       |                        |    (public disk)        |--- 5. Save File ---->|
     |                       |                        |<-- 6. File Path --------|                      |
     |                       |                        |                         |                      |
     |                       |                        |--- 7. Game::create() -->|--- 8. INSERT Game -->|
     |                       |                        |--- 9. attach(Category)->|--- 10. INSERT Pivot->|
     |                       |<-- 11. HTTP 201 -------|                         |                      |
     |                       |    (Game Model JSON)   |                         |                      |
     |<-- 12. Báo thành công-|                        |                         |                      |
     |    Cập nhật bảng Game |                        |                         |                      |
```

---
---

## 3.3. THIẾT KẾ HỆ THỐNG

### 3.3.1. Sơ đồ Kiến trúc hệ thống tổng thể (Architecture Design)

Hệ thống được thiết kế theo mô hình **3 lớp phân tách (3-Tier Decoupled Architecture)**:

1.  **Tầng Trình diễn (Presentation Layer - React 19 SPA)**: Điều hướng trang qua React Router DOM, quản lý trạng thái qua AuthContext, giao tiếp bất đồng bộ qua Axios, nhúng WebGL qua component `<GamePlayer />`.
2.  **Tầng Nghiệp vụ (Business Logic Layer - Laravel 11 RESTful API)**: Định tuyến qua `api.php`, lọc bảo mật qua Middleware (CORS, Sanctum, IsAdmin), xử lý logic qua Controllers (Auth, Game, Category, Comment, Favorite, History).
3.  **Tầng Dữ liệu (Data Access Layer - MySQL 8.x)**: Quản lý 8 bảng chuẩn hóa với các ràng buộc khóa ngoại `ON DELETE CASCADE`, đánh chỉ mục index tối ưu tốc độ truy vấn.


---

### 3.3.2. Thiết kế Cơ sở dữ liệu (Database Design & ERD)

#### A. Sơ đồ Thực thể Quan hệ (ERD - Entity Relationship Diagram):

```
 +------------------+           +----------------------+           +--------------------+
 |      USERS       |           |     PLAY_HISTORY     |           |       GAMES        |
 +------------------+           +----------------------+           +--------------------+
 | PK id            | 1       N | PK id                | N       1 | PK id              |
 |    username      +-----------+ FK user_id           +-----------+    title           |
 |    email         |           | FK game_id           |           |    slug            |
 |    password      |           |    played_at         |           |    thumbnail       |
 |    avatar        |           +----------------------+           |    play_url        |
 |    role          |                                              |    description     |
 |    created_at    | 1       N +----------------------+ N       1 |    controls_guide  |
 +--------+---------+-----------+      FAVORITES       +-----------+    play_count      |
          |                     +----------------------+           |    rating_avg      |
          |                     | PK id                |           |    badge           |
          |                     | FK user_id           |           |    status          |
          |                     | FK game_id           |           |    created_at      |
          |                     +----------------------+           +---+-------------+--+
          |                                                            |             |
          | 1                 N +----------------------+ N           1 |             |
          +---------------------+       COMMENTS       +---------------+             |
          |                     +----------------------+                             |
          |                     | PK id                |                             |
          |                     | FK user_id           |                             |
          |                     | FK game_id           |                             |
          |                     |    content           |                             |
          |                     |    created_at        |                             |
          |                     +----------------------+                             |
          |                                                                          |
          | 1                 N +----------------------+ N           1               |
          +---------------------+       RATINGS        +---------------+             |
                                +----------------------+                             |
                                | PK id                |                             |
                                | FK user_id           |                             |
                                | FK game_id           |                             |
                                |    score (1-5)       |                             |
                                |    created_at        |                             |
                                +----------------------+                             |
                                                                                     |
                                +----------------------+ N           1               |
                                |    GAME_CATEGORY     +-----------------------------+
                                +----------------------+
                                | PK,FK game_id        |
                                | PK,FK category_id    |
                                +----------+-----------+
                                           | N
                                           |
                                           | 1
                                +----------+-----------+
                                |      CATEGORIES      |
                                +----------------------+
                                | PK id                |
                                |    name              |
                                |    slug              |
                                |    icon              |
                                |    created_at        |
                                +----------------------+
```

---

#### B. Từ điển dữ liệu chi tiết các bảng (Data Dictionary):

#### 1. Bảng `users` (Tài khoản người dùng):
| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `id` | BIGINT UNSIGNED | **PK** | AUTO_INCREMENT | Mã định danh người dùng |
| `username` | VARCHAR(50) | | UNIQUE, NOT NULL | Tên tài khoản |
| `email` | VARCHAR(100) | | UNIQUE, NOT NULL | Địa chỉ email đăng nhập |
| `password` | VARCHAR(255) | | NOT NULL | Mật khẩu đã mã hóa Bcrypt |
| `avatar` | VARCHAR(255) | | NULLABLE | Đường dẫn ảnh đại diện |
| `role` | ENUM('member','admin')| | DEFAULT 'member' | Phân quyền tài khoản |
| `created_at` | TIMESTAMP | | NULLABLE | Thời điểm tạo tài khoản |
| `updated_at` | TIMESTAMP | | NULLABLE | Thời điểm cập nhật cuối |

#### 2. Bảng `categories` (Danh mục trò chơi):
| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `id` | BIGINT UNSIGNED | **PK** | AUTO_INCREMENT | Mã định danh danh mục |
| `name` | VARCHAR(100) | | NOT NULL | Tên danh mục (Trí tuệ, Đua xe...) |
| `slug` | VARCHAR(100) | | UNIQUE, NOT NULL | Đường dẫn thân thiện URL (`tri-tue`) |
| `icon` | VARCHAR(50) | | NULLABLE | Ký hiệu icon danh mục (emoji hoặc svg) |
| `created_at` | TIMESTAMP | | NULLABLE | Thời điểm tạo |

#### 3. Bảng `games` (Kho trò chơi):
| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `id` | BIGINT UNSIGNED | **PK** | AUTO_INCREMENT | Mã định danh trò chơi |
| `title` | VARCHAR(200) | | NOT NULL | Tên trò chơi |
| `slug` | VARCHAR(200) | | UNIQUE, NOT NULL | Đường dẫn thân thiện URL (`2048-classic`) |
| `thumbnail` | VARCHAR(255) | | NOT NULL | Đường dẫn ảnh đại diện game |
| `play_url` | TEXT | | NOT NULL | URL nhúng game hoặc đường dẫn WebGL build |
| `description` | TEXT | | NULLABLE | Mô tả nội dung và cách chơi |
| `controls_guide` | VARCHAR(255) | | NULLABLE | Hướng dẫn phím điều khiển |
| `play_count` | BIGINT UNSIGNED | | DEFAULT 0 | Tổng số lượt chơi |
| `rating_avg` | DECIMAL(3,2) | | DEFAULT 5.00 | Điểm đánh giá trung bình (1.00 - 5.00) |
| `badge` | ENUM('HOT','NEW','WEBGL','NORMAL') | | DEFAULT 'NORMAL' | Nhãn nổi bật |
| `status` | ENUM('published','draft','hidden') | | DEFAULT 'published' | Trạng thái hiển thị |
| `created_at` | TIMESTAMP | | NULLABLE | Thời điểm đăng game |

#### 4. Bảng `game_category` (Liên kết nhiều-nhiều Game và Category):
| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `game_id` | BIGINT UNSIGNED | **PK, FK** | REFERENCES games(id) ON DELETE CASCADE | Mã trò chơi |
| `category_id` | BIGINT UNSIGNED | **PK, FK** | REFERENCES categories(id) ON DELETE CASCADE | Mã danh mục |

#### 5. Bảng `comments` (Bình luận trò chơi):
| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `id` | BIGINT UNSIGNED | **PK** | AUTO_INCREMENT | Mã định danh bình luận |
| `user_id` | BIGINT UNSIGNED | **FK** | REFERENCES users(id) ON DELETE CASCADE | Người bình luận |
| `game_id` | BIGINT UNSIGNED | **FK** | REFERENCES games(id) ON DELETE CASCADE | Game được bình luận |
| `content` | TEXT | | NOT NULL | Nội dung bình luận |
| `created_at` | TIMESTAMP | | NULLABLE | Thời gian gửi bình luận |

#### 6. Bảng `ratings` (Chấm điểm sao):
| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `id` | BIGINT UNSIGNED | **PK** | AUTO_INCREMENT | Mã định danh đánh giá |
| `user_id` | BIGINT UNSIGNED | **FK** | REFERENCES users(id) ON DELETE CASCADE | Người đánh giá |
| `game_id` | BIGINT UNSIGNED | **FK** | REFERENCES games(id) ON DELETE CASCADE | Game được đánh giá |
| `score` | TINYINT UNSIGNED | | CHECK (score BETWEEN 1 AND 5) | Số sao chấm (1 đến 5) |
| `created_at` | TIMESTAMP | | NULLABLE | Thời điểm đánh giá |

#### 7. Bảng `favorites` (Trò chơi yêu thích):
| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `id` | BIGINT UNSIGNED | **PK** | AUTO_INCREMENT | Mã định danh yêu thích |
| `user_id` | BIGINT UNSIGNED | **FK** | REFERENCES users(id) ON DELETE CASCADE | Người lưu yêu thích |
| `game_id` | BIGINT UNSIGNED | **FK** | REFERENCES games(id) ON DELETE CASCADE | Trò chơi được yêu thích |
| `created_at` | TIMESTAMP | | NULLABLE | Thời điểm bấm yêu thích |

#### 8. Bảng `play_history` (Lịch sử chơi game):
| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `id` | BIGINT UNSIGNED | **PK** | AUTO_INCREMENT | Mã định danh lịch sử |
| `user_id` | BIGINT UNSIGNED | **FK** | REFERENCES users(id) ON DELETE CASCADE | Thành viên đã chơi |
| `game_id` | BIGINT UNSIGNED | **FK** | REFERENCES games(id) ON DELETE CASCADE | Trò chơi đã trải nghiệm |
| `played_at` | TIMESTAMP | | DEFAULT CURRENT_TIMESTAMP | Thời điểm bắt đầu chơi |

---

### 3.3.3. Thiết kế Wireframe giao diện (UI/UX Layouts)

#### 1. Wireframe Trang chủ (Homepage):
```
+-----------------------------------------------------------------------------------+
|  [LOGO GAMEX]     [ Ô Tìm kiếm game... 🔍 ]       [❤️ Yêu thích (2)]  [👤 Đăng nhập] |
+-----------------------------------------------------------------------------------+
|  [🌟 Tất cả]  [🔥 Game Hot]  [🕹️ Trí tuệ]  [⚔️ Hành động]  [🏎️ Đua xe]  [🎯 Bắn súng]   |
+-----------------------------------------------------------------------------------+
|  +--------------------------------------------------+  +-----------------------+  |
|  | HERO SPOTLIGHT: GAME NỔI BẬT                     |  |                       |  |
|  | 2048 Classic & 3D Arcade                         |  |     BANNER / DEMO     |  |
|  | Trải nghiệm game HTML5 & WebAssembly tức thì      |  |      IMAGE GAME       |  |
|  | [ ▶️ CHƠI NGAY MIỄN PHÍ ]                         |  |                       |  |
|  +--------------------------------------------------+  +-----------------------+  |
+-----------------------------------------------------------------------------------+
|  🕹️ DANH SÁCH TRÒ CHƠI                                                           |
|  +---------------+  +---------------+  +---------------+  +---------------+       |
|  | [Thumb Game 1]|  | [Thumb Game 2]|  | [Thumb Game 3]|  | [Thumb Game 4]|       |
|  | [HOT]    [❤️] |  | [NEW]    [🤍] |  | [WEBGL]  [❤️] |  | [HOT]    [🤍] |       |
|  | 2048 Puzzle   |  | Hextris 360   |  | Tower Build 3D|  | Pacman Retro  |       |
|  | ★ 4.9 • TríTuệ|  | ★ 4.8 • Arcade|  | ★ 4.7 • Action|  | ★ 5.0 • Arcade|       |
|  +---------------+  +---------------+  +---------------+  +---------------+       |
+-----------------------------------------------------------------------------------+
|  FOOTER: Đồ Án Tốt Nghiệp Hệ Thống Thông Tin • Cổng Game Trực Tuyến HTML5/WebGL   |
+-----------------------------------------------------------------------------------+
```

#### 2. Wireframe Màn hình Chơi Game (`<GamePlayer />`):
```
+-----------------------------------------------------------------------------------+
|  [LOGO GAMEX]     [ Ô Tìm kiếm game... 🔍 ]       [❤️ Yêu thích (2)]  [👤 Đăng nhập] |
+-----------------------------------------------------------------------------------+
|  🎮 2048 Classic Puzzle  [Nhãn: Trí tuệ]                    [ ✕ Đóng / Quay lại ] |
+-----------------------------------------------------------------------------------+
|  +-----------------------------------------------------------------------------+  |
|  |                                                                             |  |
|  |                     KHUNG CHƠI GAME (WEBGL / IFRAME CANVAS)                 |  |
|  |                                                                             |  |
|  +-----------------------------------------------------------------------------+  |
|  [ ❤️ Đã yêu thích ]   [ ★★★★★ 5.0/5.0 ]             👁️ 124,500 lượt chơi  [⛶ Zoom] |
+-----------------------------------------------------+-----------------------------+
|  📖 HƯỚNG DẪN CHƠI & ĐIỀU KHIỂN                     | 🔥 GAME ĐỀ XUẤT             |
|  - Dùng phím mũi tên ghép các ô số đạt 2048.        | +-------------------------+ |
|  - Phím điều khiển: [← ↑ → ↓] hoặc [W A S D]        | | [Thumb] Hextris 360     | |
|                                                     | | ★ 4.8 • Arcade          | |
|  💬 BÌNH LUẬN CỘNG ĐỒNG                             | +-------------------------+ |
|  [ Nhập bình luận của bạn...             ] [ Gửi ]  | | [Thumb] Tower Build 3D  | |
|  - @GamerPro99 (10 phút trước): Game rất mượt!      | | ★ 4.7 • Action          | |
|  - @MinhTri_2k (1 giờ trước): Đồ án làm đẹp quá!    | +-------------------------+ |
+-----------------------------------------------------+-----------------------------+
```

---
*Tài liệu Chương 3: Phân tích và Thiết kế hệ thống đã được chuẩn hóa hoàn chỉnh theo chuẩn đồ án tốt nghiệp.*
