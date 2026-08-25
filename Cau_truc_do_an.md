# ĐỀ CƯƠNG CHI TIẾT ĐỒ ÁN TỐT NGHIỆP
## Đề tài: Xây dựng Website Game Trực Tuyến (mô hình tương tự GameVui.vn)

> Đề cương này bám sát 100% khung chương mục của mẫu đồ án bro gửi (Tổng quan → Kiến thức nền tảng → Phân tích thiết kế → Xây dựng chương trình), chỉ thay nội dung "cửa hàng/sản phẩm" bằng "cổng game/lượt chơi".

---

> **Lộ trình thực hiện 47 nhiệm vụ** (checklist làm việc hàng ngày) đã được tách sang file riêng: `ke_hoach_47_nhiem_vu.md`. File này chỉ còn nội dung báo cáo chính thức.

## CHƯƠNG 1. TỔNG QUAN

> *Bản thảo dưới đây viết sẵn để bro dùng làm khung — nên đọc lại, chỉnh theo giọng văn riêng và thêm chi tiết cá nhân trước khi đưa vào báo cáo chính thức.*

**1.1. Lý do chọn đề tài**

Trong những năm gần đây, xu hướng chơi game trực tuyến ngay trên trình duyệt web phát triển mạnh mẽ nhờ sự tiến bộ của công nghệ HTML5 và WebGL. Người dùng không còn phải tải và cài đặt ứng dụng cồng kềnh mà có thể truy cập, trải nghiệm hàng trăm tựa game chỉ bằng một cú nhấp chuột, trên bất kỳ thiết bị nào có trình duyệt web — từ máy tính, laptop cho đến điện thoại di động.

Tại Việt Nam, các cổng game trực tuyến như GameVui.vn, Y8 hay Friv đã và đang thu hút lượng lớn người dùng, đặc biệt là giới trẻ, nhờ kho game đa dạng, giao diện thân thiện và khả năng chơi ngay không cần cài đặt. Tuy nhiên, đây đều là những hệ thống thương mại quy mô lớn với kiến trúc phức tạp, không công khai mã nguồn hay tài liệu kỹ thuật.

Xuất phát từ mong muốn tìm hiểu sâu về quy trình xây dựng một hệ thống website hoàn chỉnh — từ khâu phân tích yêu cầu, thiết kế cơ sở dữ liệu, xây dựng API, cho đến phát triển giao diện người dùng — em quyết định lựa chọn đề tài xây dựng một website cổng game trực tuyến thu nhỏ, mô phỏng theo mô hình hoạt động của các trang game phổ biến hiện nay.

Bên cạnh đó, với nền tảng cá nhân đã có kinh nghiệm phát triển game bằng Unity và từng làm việc với các dự án WebGL, em có lợi thế để không chỉ xây dựng phần hạ tầng website mà còn có thể tự sản xuất một phần nội dung game thực tế cho hệ thống, thay vì chỉ đơn thuần tổng hợp game từ nguồn bên ngoài. Đây cũng là cơ hội để kết hợp giữa kiến thức lập trình game đã có với kỹ năng phát triển web full-stack, tạo nên một sản phẩm hoàn chỉnh và có tính ứng dụng thực tế.

**1.2. Mục tiêu của đề tài**

Đề tài hướng đến việc xây dựng một website cổng game trực tuyến hoàn chỉnh, đạt được các mục tiêu cụ thể sau:

- Về phía người dùng: xây dựng giao diện cho phép người dùng duyệt game theo danh mục, tìm kiếm game theo tên, xem thông tin chi tiết và chơi game trực tiếp trên trình duyệt mà không cần cài đặt phần mềm bổ trợ.
- Về hệ thống thành viên: cho phép người dùng đăng ký, đăng nhập tài khoản; lưu lại danh sách game yêu thích; theo dõi lịch sử các game đã chơi; bình luận, đánh giá về game.
- Về phía quản trị: xây dựng hệ thống quản trị (Admin CMS) cho phép quản lý toàn bộ dữ liệu hệ thống, bao gồm quản lý game, danh mục, tài khoản người dùng và kiểm duyệt bình luận.
- Về mặt kỹ thuật: áp dụng kiến trúc RESTful API tách biệt giữa backend (Laravel) và frontend (React.js), đảm bảo hệ thống có khả năng mở rộng và bảo trì tốt.
- Về nội dung: tích hợp một số lượng game hoạt động thực tế, trong đó có ít nhất một game do chính tác giả tự phát triển bằng Unity và xuất bản dưới định dạng WebGL, nhằm thể hiện năng lực xây dựng sản phẩm hoàn chỉnh từ đầu đến cuối.

**1.3. Giới hạn và phạm vi đề tài**

Do giới hạn về thời gian thực hiện và nguồn lực của một cá nhân, đề tài tập trung vào phạm vi sau:

- Phạm vi triển khai gồm hai phần: (1) website dành cho người dùng cuối, hiển thị và cho phép chơi game trực tuyến; (2) hệ thống quản trị dành cho người quản lý nội dung.
- Về nguồn nội dung game, đề tài giới hạn ở việc kết hợp: (i) một số game do tác giả tự phát triển bằng Unity, xuất bản định dạng WebGL; và (ii) một số game HTML5 được tích hợp hợp pháp thông qua các nền tảng phân phối nội dung dành cho publisher (ví dụ GameDistribution), hoặc các game mã nguồn mở có giấy phép cho phép sử dụng lại.
- Đề tài không triển khai chức năng thanh toán thực tế; các tính năng liên quan đến gói thành viên (nếu có) chỉ dừng ở mức mô phỏng giao diện, không kết nối cổng thanh toán thật.
- Hệ thống được xây dựng và kiểm thử trong môi trường phát triển cục bộ (local) và demo, chưa triển khai lên môi trường production với lượng truy cập lớn.

**1.4. Kết quả dự kiến đạt được**

Sau khi hoàn thành, đề tài dự kiến đạt được các kết quả sau:

- Một website cổng game trực tuyến hoàn chỉnh, chạy ổn định, cho phép người dùng duyệt, tìm kiếm và chơi game ngay trên trình duyệt.
- Hệ thống quản trị (Admin CMS) đầy đủ chức năng quản lý game, danh mục, tài khoản và bình luận.
- Tối thiểu một game được tác giả tự phát triển và tích hợp thành công vào hệ thống dưới dạng WebGL, không phải dữ liệu giả lập.
- Báo cáo đồ án trình bày đầy đủ quá trình khảo sát, phân tích, thiết kế và xây dựng hệ thống theo đúng quy trình phát triển phần mềm.

---

## CHƯƠNG 2. KIẾN THỨC NỀN TẢNG

> *Cũng là bản thảo — đọc lại, chỉnh giọng văn và bổ sung ví dụ/hình ảnh riêng trước khi nộp.*

**2.1. Cơ sở lý thuyết**

*2.1.1. Kiến trúc website hiện đại*

Các ứng dụng web hiện đại phần lớn được xây dựng theo mô hình client-server, trong đó phía client (trình duyệt) và phía server (máy chủ) giao tiếp với nhau thông qua giao thức HTTP/HTTPS. Trong mô hình truyền thống, mỗi khi người dùng thực hiện một thao tác, server sẽ xử lý và trả về toàn bộ trang HTML mới, khiến trang phải tải lại hoàn toàn.

Kiến trúc Single Page Application (SPA) khắc phục hạn chế này bằng cách chỉ tải một trang HTML duy nhất ban đầu, sau đó toàn bộ việc cập nhật giao diện được xử lý bằng JavaScript ở phía client, dữ liệu được trao đổi với server thông qua các lời gọi API bất đồng bộ (thường ở định dạng JSON). Cách tiếp cận này giúp trải nghiệm người dùng mượt mà hơn, giảm tải cho server vì phần lớn công việc xử lý giao diện được thực hiện ở phía client.

Để phía client và server giao tiếp một cách chuẩn hóa, đề tài áp dụng kiến trúc RESTful API — tập hợp các nguyên tắc thiết kế API dựa trên các phương thức HTTP chuẩn (GET, POST, PUT, DELETE) tương ứng với các thao tác đọc, tạo mới, cập nhật và xóa dữ liệu. Backend (Laravel) đóng vai trò cung cấp các API này, còn frontend (React.js) đóng vai trò client gọi API và hiển thị dữ liệu cho người dùng.

*[Hình 2.x: Sơ đồ kiến trúc Client - API - Database]*

*2.1.2. CSS*

CSS (Cascading Style Sheets) là ngôn ngữ định kiểu dùng để mô tả cách trình bày của một tài liệu HTML, bao gồm màu sắc, bố cục, phông chữ và hiệu ứng hiển thị. Trong đề tài, CSS được dùng để xây dựng giao diện responsive, đảm bảo website hiển thị tốt trên nhiều kích thước màn hình khác nhau, từ máy tính để bàn đến điện thoại di động — điều đặc biệt quan trọng với một cổng game trực tuyến khi phần lớn người dùng có xu hướng truy cập từ thiết bị di động.

*2.1.3. HTML5 (đặc biệt Canvas/WebGL)*

HTML5 là phiên bản mới nhất của ngôn ngữ đánh dấu HTML, bổ sung nhiều thẻ và API mới hỗ trợ đa phương tiện mà không cần plugin bên thứ ba (như Flash trước đây). Hai thành phần quan trọng nhất với đề tài là Canvas và WebGL.

Canvas là một thẻ HTML5 cho phép vẽ đồ họa 2D trực tiếp trên trình duyệt thông qua JavaScript, thường dùng làm nền tảng cho các game 2D đơn giản chạy trên web (ví dụ game xây dựng bằng thư viện Phaser.js).

WebGL (Web Graphics Library) là một API JavaScript cho phép render đồ họa 2D và 3D có gia tốc phần cứng ngay trong trình duyệt, không cần cài plugin. Đây chính là công nghệ nền tảng cho phép các game phát triển bằng công cụ như Unity có thể xuất bản (build) thành phiên bản chạy được trực tiếp trên trình duyệt web, mở đường cho việc nhúng các game 3D có đồ họa phức tạp vào một website thông thường.

**2.2. Công cụ sử dụng**

*2.2.1. React.js*

React.js là thư viện JavaScript mã nguồn mở do Meta phát triển, dùng để xây dựng giao diện người dùng theo hướng component — giao diện được chia nhỏ thành các thành phần độc lập, có thể tái sử dụng. React sử dụng cơ chế Virtual DOM giúp tối ưu hiệu năng khi cập nhật giao diện, cùng hệ thống quản lý trạng thái (state) và các hook (useState, useEffect) giúp việc xử lý logic rõ ràng, dễ bảo trì. Trong đề tài, React.js đảm nhiệm toàn bộ giao diện phía người dùng, từ trang danh sách game, trang chi tiết, đến giao diện quản trị.

*2.2.2. Framework Laravel*

Laravel là framework PHP mã nguồn mở, thiết kế theo kiến trúc MVC (Model - View - Controller), giúp tách biệt rõ ràng giữa logic xử lý dữ liệu (Model), giao diện hiển thị (View) và logic điều khiển (Controller). Laravel cung cấp sẵn nhiều công cụ hỗ trợ phát triển nhanh như Eloquent ORM (thao tác cơ sở dữ liệu qua đối tượng thay vì viết SQL thuần), hệ thống Routing linh hoạt, cùng các gói mở rộng như Sanctum hỗ trợ xác thực người dùng qua token. Trong đề tài, Laravel xây dựng toàn bộ hệ thống backend, cung cấp các RESTful API cho phía frontend React.js sử dụng.

*[Hình 2.1: Mô hình MVC trong Laravel]*

*2.2.3. MySQL*

MySQL là hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) mã nguồn mở phổ biến, sử dụng ngôn ngữ truy vấn SQL để thao tác dữ liệu. Trong đề tài, MySQL lưu trữ toàn bộ dữ liệu hệ thống: thông tin tài khoản, danh sách game, danh mục, bình luận, lượt yêu thích và lịch sử chơi game.

*2.2.4. Unity và WebGL Export*

Unity là một trong những công cụ phát triển game phổ biến nhất hiện nay, hỗ trợ xuất bản (build) sản phẩm ra nhiều nền tảng, trong đó có WebGL — cho phép game chạy trực tiếp trên trình duyệt mà không cần cài đặt. Trong đề tài, Unity được dùng để phát triển game do chính tác giả thực hiện, sau đó build sang định dạng WebGL và tích hợp vào website thông qua thẻ iframe hoặc gọi trực tiếp file build đã host trên server. Ngoài ra, đề tài có thể cân nhắc dùng thêm Phaser.js — thư viện JavaScript chuyên cho phát triển game 2D trên nền HTML5 Canvas — nếu cần phát triển thêm game nhỏ, nhẹ hơn để bổ sung cho kho game của hệ thống.

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
