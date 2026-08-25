# ĐỒ ÁN TỐT NGHIỆP HỆ THỐNG THÔNG TIN
# ĐỀ TÀI: XÂY DỰNG WEBSITE CỔNG GAME TRỰC TUYẾN (MÔ HÌNH GAMEVUI.VN)

---

# CHƯƠNG 1. TỔNG QUAN

## 1.1. Lý do chọn đề tài

Trong bối cảnh bùng nổ của công nghệ thông tin và mạng Internet băng thông rộng hiện nay, nhu cầu giải trí số của con người ngày càng gia tăng, trong đó trò chơi điện tử (game) đóng vai trò là một trong những hình thức giải trí phổ biến nhất. Trước đây, để trải nghiệm một tựa game, người dùng thường phải trải qua nhiều công đoạn phức tạp như tải tệp cài đặt có dung lượng lớn, cài đặt các phần mềm bổ trợ (DirectX, VC++ Redistributable), hoặc phụ thuộc vào các plugin trình duyệt dễ phát sinh lỗ hổng bảo mật như Adobe Flash Player. 

Sự ra đời và hoàn thiện của tiêu chuẩn **HTML5, Canvas 2D, WebGL (Web Graphics Library)** và **WebAssembly (WASM)** đã tạo nên một cuộc cách mạng trong lĩnh vực phân phối trò chơi điện tử. Giờ đây, các trò chơi từ đồ họa 2D nhẹ nhàng đến 3D sống động đều có thể chạy mượt mà ngay trên trình duyệt web chỉ bằng một cú nhấp chuột (Instant Play), không đòi hỏi bất kỳ bước cài đặt hay cấu hình phần cứng phức tạp nào, đồng thời tương thích đa nền tảng từ máy tính để bàn (PC), laptop đến các thiết bị di động (smartphone, tablet).

Tại thị trường Việt Nam và quốc tế, các cổng trò chơi trực tuyến như *GameVui.vn*, *Y8.com*, *Poki.com*, hay *CrazyGames.com* thu hút hàng chục triệu lượt truy cập mỗi tháng. Tuy nhiên, phần lớn các hệ thống này là sản phẩm thương mại độc quyền, có kiến trúc khép kín và không công khai mã nguồn cũng như quy trình thiết kế kỹ thuật.

Xuất phát từ nhu cầu thực tiễn và mong muốn làm chủ quy trình phát triển một hệ thống phần mềm hoàn chỉnh theo tiêu chuẩn công nghiệp — từ khâu khảo sát, phân tích yêu cầu, thiết kế kiến trúc cơ sở dữ liệu, xây dựng hệ thống RESTful API đến phát triển giao diện người dùng tương tác cao — tác giả đã lựa chọn đề tài: **"Xây dựng Website Cổng Game Trực Tuyến"**.

Đặc biệt, đề tài tận dụng lợi thế của tác giả trong lĩnh vực lập trình game bằng công cụ **Unity Engine** và kỹ năng xuất bản trò chơi định dạng **WebGL**. Điều này cho phép đề tài không chỉ dừng lại ở mức xây dựng một nền tảng tổng hợp game thông thường, mà còn có khả năng tự sản xuất và tích hợp các trò chơi do chính tác giả phát triển, tạo nên sự kết hợp hài hòa giữa kỹ thuật phát triển ứng dụng web hiện đại (Full-stack Web Development) và công nghệ đồ họa trò chơi tương tác (Game Development).

---

## 1.2. Mục tiêu của đề tài

Đề tài hướng tới việc xây dựng một cổng thông tin và trò chơi trực tuyến hoàn chỉnh, đáp ứng các mục tiêu cụ thể sau:

### 1.2.1. Về phía Người dùng (Client - Người chơi):
*   **Trải nghiệm chơi game tức thì**: Cho phép người dùng duyệt kho game theo danh mục (hành động, trí tuệ, đua xe, arcade...), tìm kiếm theo từ khóa, xem hướng dẫn và chơi game trực tiếp trên trình duyệt mà không cần cài đặt.
*   **Hệ thống tài khoản thành viên**: Hỗ trợ đăng ký, đăng nhập an toàn; quản lý trang cá nhân; lưu trữ danh sách trò chơi yêu thích (Favorites) và theo dõi lịch sử các trò chơi đã trải nghiệm gần đây (Play History).
*   **Tương tác cộng đồng**: Cung cấp tính năng gửi bình luận (Comments), chấm điểm đánh giá (Ratings) cho từng tựa game.

### 1.2.2. Về phía Quản trị viên (Admin CMS):
*   **Quản lý nội dung (Game & Category Management)**: Thực hiện đầy đủ các thao tác Thêm, Sửa, Xóa, Ẩn/Hiện trò chơi; quản trị danh mục trò chơi; tải lên hình ảnh đại diện (Thumbnail) và tệp nguồn/đường dẫn nhúng game.
*   **Kiểm duyệt & Quản trị người dùng**: Quản lý danh sách tài khoản thành viên, phân quyền người dùng (Member/Admin), khóa tài khoản vi phạm và kiểm duyệt/xóa các bình luận không phù hợp.
*   **Thống kê hệ thống cơ bản**: Theo dõi số lượt chơi, mức độ tương tác và sự phổ biến của từng tựa game trên hệ thống.

### 1.2.3. Về mặt Kỹ thuật & Kiến trúc:
*   Áp dụng kiến trúc tách biệt hoàn toàn (Decoupled Architecture) giữa **Backend (Laravel RESTful API)** và **Frontend (React.js Single Page Application)**.
*   Xây dựng hệ thống cơ sở dữ liệu chuẩn hóa trên **MySQL**, đảm bảo tính toàn vẹn dữ liệu, hiệu năng truy vấn và khả năng mở rộng.
*   Cơ chế xác thực an toàn không trạng thái (Stateless Authentication) sử dụng **Laravel Sanctum**.

### 1.2.4. Về mặt Nội dung Game:
*   Tích hợp thành công tối thiểu một trò chơi 2D/3D do chính tác giả tự xây dựng bằng **Unity** và xuất bản sang định dạng **WebGL**.
*   Tích hợp đa dạng các tựa game HTML5 hợp pháp từ các nền tảng phân phối game uy tín (GameDistribution, Open-source HTML5 games).

---

## 1.3. Giới hạn và phạm vi đề tài

Do giới hạn về mặt thời gian và nguồn lực nghiên cứu của một đồ án tốt nghiệp cá nhân, phạm vi đề tài được xác định cụ thể như sau:

*   **Phạm vi hệ thống**: Gồm 2 phân hệ chính:
    1.  *Giao diện người dùng (User Portal)*: Phục vụ trải nghiệm duyệt, tìm kiếm, tương tác và chơi game.
    2.  *Giao diện quản trị (Admin Dashboard/CMS)*: Phục vụ công tác quản lý dữ liệu, người dùng và nội dung hệ thống.
*   **Phạm vi nguồn dữ liệu trò chơi**:
    *   Tập trung vào 3 nguồn trò chơi chính: (1) Game do tác giả tự xây dựng bằng Unity WebGL; (2) Game nhúng hợp pháp qua API/iFrame từ cổng phân phối dành cho nhà phát triển (GameDistribution Publisher Program); (3) Game HTML5 mã nguồn mở có giấy phép tự do (MIT/Apache 2.0).
    *   Đề tài cam kết tuân thủ bản quyền, không thực hiện trích xuất (crawl/scrape) trái phép dữ liệu từ các website thương mại khác.
*   **Phạm vi tính năng thanh toán**: Đề tài tập trung vào giải pháp chơi game miễn phí (Free-to-Play). Các tính năng gói thành viên VIP hoặc nạp vật phẩm (nếu được mở rộng) chỉ dừng lại ở mức mô phỏng giao diện và luồng dữ liệu, không tích hợp cổng thanh toán trực tuyến thực tế (Payment Gateway).
*   **Môi trường triển khai**: Hệ thống được xây dựng, cấu hình và thử nghiệm toàn diện trên môi trường cục bộ (Local Development Environment) và máy chủ thử nghiệm (Staging/Demo Server).

---

## 1.4. Kết quả dự kiến đạt được

Sau khi hoàn thành đồ án, các kết quả cụ thể bao gồm:

1.  **Sản phẩm phần mềm hoàn chỉnh**:
    *   Hệ thống Backend RESTful API viết bằng PHP (Laravel 11), đảm bảo tốc độ phản hồi nhanh, bảo mật và chuẩn hóa JSON.
    *   Giao diện Frontend Single Page Application viết bằng React 19 + Vite, giao diện đẹp mắt, tương thích linh hoạt (Responsive) trên cả máy tính và điện thoại.
    *   Trang quản trị Admin trực quan, hỗ trợ quản lý toàn bộ thực thể trong hệ thống.
2.  **Sản phẩm trò chơi tương tác**:
    *   Tối thiểu 01 trò chơi được xây dựng bằng Unity Engine, xuất bản WebGL và tích hợp mượt mà vào website, hoạt động ổn định trên các trình duyệt phổ biến (Chrome, Edge, Firefox).
3.  **Tài liệu báo cáo học thuật**:
    *   Quyển báo cáo đồ án tốt nghiệp trình bày chi tiết từ cơ sở lý thuyết, phân tích các biểu đồ UML (Usecase, Activity, Sequence, Class), thiết kế CSDL (ERD), kiến trúc hệ thống và kết quả kiểm thử (Unit Test, Integration Test).

---
---

# CHƯƠNG 2. KIẾN THỨC NỀN TẢNG

## 2.1. Cơ sở lý thuyết

### 2.1.1. Kiến trúc Website hiện đại & Single Page Application (SPA)

Trong mô hình ứng dụng web truyền thống (Multi-Page Application - MPA), mỗi tương tác của người dùng (như chuyển trang, gửi biểu mẫu) đều gửi một yêu cầu HTTP đến máy chủ. Máy chủ xử lý logic, truy vấn cơ sở dữ liệu, dựng (render) lại toàn bộ trang HTML mới và gửi về cho trình duyệt. Mô hình này gây lãng phí băng thông mạng, tăng tải cho máy chủ và làm gián đoạn trải nghiệm người dùng do hiện tượng "chớp trắng" khi tải lại trang.

Kiến trúc **Single Page Application (SPA)** giải quyết triệt để hạn chế trên:
*   Trình duyệt chỉ tải một tệp HTML duy nhất (`index.html`) cùng các gói mã JavaScript và CSS ở lần truy cập đầu tiên.
*   Khi người dùng thao tác, trình duyệt không tải lại toàn bộ trang mà sử dụng cơ chế định tuyến phía máy khách (Client-side Routing) và gọi các yêu cầu bất đồng bộ (**AJAX / Fetch API / Axios**) để lấy dữ liệu thô (thường là định dạng JSON) từ máy chủ.
*   Giao diện người dùng được cập nhật cục bộ và linh hoạt ngay tại trình duyệt, mang lại trải nghiệm mượt mà tương tự như ứng dụng desktop hoặc mobile native.

```
+-------------------------------------------------------------------------+
|                          KIẾN TRÚC CLIENT - SERVER                      |
|                                                                         |
|  +--------------------+                     +------------------------+  |
|  |     CLIENT         |   HTTP Request      |        SERVER          |  |
|  |  (React.js SPA)    | ----------------->  |   (Laravel REST API)   |  |
|  |                    |                     |                        |  |
|  |  - Giao diện (UI)  |   JSON Response     |  - Xử lý nghiệp vụ     |  |
|  |  - WebGL Game Frame| <-----------------  |  - Xác thực (Sanctum)  |  |
|  +--------------------+                     +-----------+------------+  |
|                                                         |               |
|                                                  SQL    | Eloquent ORM  |
|                                                         v               |
|                                             +------------------------+  |
|                                             |    DATABASE (MySQL)    |  |
|                                             +------------------------+  |
+-------------------------------------------------------------------------+
```

### 2.1.2. Chuẩn kiến trúc RESTful API

**REST (Representational State Transfer)** là một phong cách kiến trúc phần mềm tiêu chuẩn cho việc xây dựng các dịch vụ web giao tiếp qua giao thức HTTP. Một hệ thống API tuân theo chuẩn RESTful sở hữu các đặc trưng cốt lõi:

*   **Tách biệt Client - Server**: Phía hiển thị giao diện (Client) và phía lưu trữ xử lý dữ liệu (Server) hoàn toàn độc lập, cho phép nâng cấp hoặc thay đổi một bên mà không ảnh hưởng tới bên còn lại.
*   **Không lưu trạng thái (Stateless)**: Mỗi yêu cầu từ Client gửi lên Server phải chứa đầy đủ mọi thông tin cần thiết để xử lý yêu cầu đó (ví dụ thông tin Token xác thực), Server không lưu phiên làm việc (Session) của người dùng trong bộ nhớ.
*   **Giao diện chuẩn hóa (Uniform Interface)**: Sử dụng các phương thức HTTP tiêu chuẩn tương ứng với các thao tác dữ liệu (CRUD):
    *   `GET`: Đọc/truy xuất danh sách hoặc chi tiết tài nguyên.
    *   `POST`: Tạo mới tài nguyên.
    *   `PUT` / `PATCH`: Cập nhật toàn bộ hoặc một phần tài nguyên.
    *   `DELETE`: Xóa tài nguyên.
*   **Định dạng trao đổi JSON**: Dữ liệu gửi đi và phản hồi đều sử dụng chuẩn JSON (JavaScript Object Notation), nhẹ, dễ đọc và tương thích tự nhiên với JavaScript.

### 2.1.3. CSS và Thiết kế Responsive Web Design (RWD)

CSS (Cascading Style Sheets) định nghĩa cách trình bày trực quan của các thành phần HTML trên trang. Trong một ứng dụng cổng game, việc thiết kế đáp ứng đa kích thước màn hình (**Responsive Web Design**) là yêu cầu sống còn vì người dùng có thể chơi game trên màn hình máy tính tỉ lệ 16:9, máy tính bảng hoặc màn hình dọc của điện thoại di động.

Đề tài áp dụng các kỹ thuật CSS hiện đại:
*   **CSS Grid & Flexbox**: Tạo bố cục lưới danh sách thẻ game (Game Cards) tự động co giãn theo độ phân giải màn hình.
*   **Media Queries**: Tùy biến thanh điều hướng (Navbar chuyển thành Hamburger Menu trên mobile) và co giãn khung chơi game (`<iframe />` hoặc Canvas WebGL) giữ nguyên tỷ lệ khung hình chuẩn (Aspect Ratio 16:9 hoặc 4:3).

### 2.1.4. HTML5 Canvas, WebGL và WebAssembly (WASM)

1.  **HTML5 Canvas**:
    Thẻ `<canvas>` cung cấp một vùng vẽ điểm ảnh 2D trên trang web. Bằng cách sử dụng JavaScript và Context 2D (`getContext('2d')`), lập trình viên có thể vẽ các hình dạng, xử lý hoạt họa (Animation), phát hiện va chạm (Collision Detection) và dựng các tựa game 2D cổ điển (như Snake, Flappy Bird, 2048) với hiệu năng cao.

2.  **Công nghệ WebGL (Web Graphics Library)**:
    WebGL là một tiêu chuẩn API đồ họa JavaScript cấp thấp, dựa trên nền tảng OpenGL ES, cho phép trình duyệt truy cập trực tiếp vào phần cứng card đồ họa (**GPU Acceleration**) của thiết bị mà không cần cài đặt thêm plugin bên ngoài. WebGL hỗ trợ tính toán ma trận, xử lý Shader (Vertex Shader, Fragment Shader) và render đồ họa 3D phức tạp với tốc độ khung hình cao (60 FPS).

3.  **WebAssembly (WASM)**:
    WebAssembly là định dạng mã nhị phân nhỏ gọn, tốc độ thực thi tiệm cận mã máy (Near-native speed), hoạt động song song với JavaScript trong trình duyệt. Khi một dự án game được phát triển bằng C# trên Unity Engine, trình biên dịch Unity sẽ sử dụng công nghệ **IL2CPP** để dịch mã C# thành mã nguồn C++, sau đó công cụ **Emscripten** biên dịch C++ thành các tệp nhị phân `.wasm` và mã WebGL. Nhờ đó, trò chơi Unity 3D có thể chạy trực tiếp trên trình duyệt web của người dùng với hiệu năng tối ưu.

---

## 2.2. Công cụ và Công nghệ sử dụng

### 2.2.1. Thư viện React.js (Frontend)

React.js là thư viện JavaScript mã nguồn mở hàng đầu do Meta (Facebook) phát triển, chuyên biệt cho việc xây dựng giao diện người dùng (UI) động và hiện đại.

*   **Kiến trúc dựa trên Component**: Giao diện được chia thành các khối độc lập, có thể tái sử dụng (như `Header`, `Footer`, `GameCard`, `GamePlayer`, `CommentList`).
*   **Cơ chế Virtual DOM**: Khi trạng thái (state) thay đổi, React tính toán sự khác biệt giữa cây Virtual DOM mới và cũ (Diffing Algorithm), chỉ cập nhật những phần tử thực sự thay đổi trên DOM thật của trình duyệt, giúp tối ưu hiệu năng vượt bậc.
*   **React Hooks**: Cho phép quản lý trạng thái và vòng đời component một cách tường minh và ngắn gọn:
    *   `useState`: Khởi tạo và quản lý biến trạng thái cục bộ.
    *   `useEffect`: Xử lý các tác vụ bất đồng bộ (gọi API lấy danh sách game khi trang vừa tải).
    *   `useContext`: Quản lý trạng thái toàn cục (ví dụ thông tin đăng nhập của người dùng).
    *   `useParams`: Lấy tham số động từ thanh địa chỉ URL (ví dụ `slug` của game).

*Ví dụ đoạn mã React Component lấy danh sách game từ API backend:*
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from './GameCard';

function HotGamesList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi RESTful API lấy danh sách game nổi bật
    axios.get('http://127.0.0.1:8000/api/games?sort=hot')
      .then(response => {
        setGames(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Lỗi khi tải danh sách game:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Đang tải danh sách trò chơi...</div>;

  return (
    <div className="game-grid">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default HotGamesList;
```

### 2.2.2. Framework Laravel (Backend API)

Laravel là framework PHP mã nguồn mở mạnh mẽ và phổ biến nhất hiện nay, tuân theo mô hình thiết kế **MVC (Model - View - Controller)**:

```
                  +-----------------------------------+
                  |      HTTP Request từ Client       |
                  +-----------------+-----------------+
                                    |
                                    v
                           +-----------------+
                           |     Routing     |
                           +--------+--------+
                                    |
                                    v
                           +-----------------+
                           |   Middleware    | (Xác thực Sanctum, Phân quyền IsAdmin, CORS)
                           +--------+--------+
                                    |
                                    v
                           +-----------------+
                           |   Controller    | (Xử lý nghiệp vụ)
                           +--------+--------+
                                    |
                +-------------------+-------------------+
                |                                       |
                v                                       v
      +-------------------+                   +-------------------+
      |  Model (Eloquent) |                   |   JSON Response   |
      +---------+---------+                   +-------------------+
                |
                v
      +-------------------+
      |   MySQL Database  |
      +-------------------+
```

*   **Routing & Middleware**: Hệ thống định tuyến linh hoạt, cho phép gắn các lớp lọc Middleware (kiểm tra token người dùng qua Sanctum, kiểm tra quyền quản trị `IsAdmin`, xử lý cấu hình CORS).
*   **Eloquent ORM (Object-Relational Mapping)**: Cho phép tương tác với cơ sở dữ liệu hoàn toàn bằng các đối tượng và cú pháp PHP trực quan thay vì viết câu lệnh SQL thuần. Hỗ trợ thiết lập các quan hệ phức tạp như 1-Nhiều (Category - Games), Nhiều-Nhiều (Game - Category qua bảng pivot `game_category`).
*   **Laravel Sanctum**: Cung cấp cơ chế xác thực Token gọn nhẹ (Personal Access Tokens) cho Single Page Application, đảm bảo các thao tác như lưu game yêu thích, gửi bình luận chỉ được thực hiện bởi thành viên hợp lệ.

### 2.2.3. Hệ quản trị Cơ sở dữ liệu MySQL

MySQL là hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) mã nguồn mở, hoạt động theo mô hình Client - Server:
*   Lưu trữ dữ liệu có cấu trúc dưới dạng các bảng (Tables) gồm các hàng và cột.
*   Đảm bảo các nguyên lý ACID (Atomicity, Consistency, Isolation, Durability) cho các giao dịch dữ liệu.
*   Cung cấp tính toàn vẹn dữ liệu thông qua khóa chính (Primary Key), khóa ngoại (Foreign Key) và chỉ mục (Index) giúp tối ưu tốc độ tìm kiếm trò chơi.

### 2.2.4. Công cụ Unity Engine và WebGL Export

Unity là engine phát triển game đa nền tảng mạnh mẽ hàng đầu thế giới:
*   Hỗ trợ lập trình logic game bằng ngôn ngữ C# với hệ thống thư viện vật lý (Physics 2D/3D), âm thanh, và hạt hiệu ứng (Particle System) hoàn chỉnh.
*   Tính năng **WebGL Build Pipeline**: Cho phép biên dịch toàn bộ mã nguồn, asset âm thanh, mô hình 3D và texture thành gói web gồm:
    *   Tệp `index.html`: Khung khởi chạy.
    *   Tệp `Build/*.loader.js`: Trình tải game.
    *   Tệp `Build/*.wasm`: Mã thực thi WebAssembly.
    *   Tệp `Build/*.data`: Dữ liệu tài nguyên game được nén tối ưu.
*   Nhúng vào ứng dụng web thông qua thẻ `<iframe />` được cấu hình phân quyền sandbox bảo mật hoặc sử dụng component React chuyên dụng.

---
*Tài liệu Chương 1 & Chương 2 đã được chuẩn hóa theo cấu trúc đồ án tốt nghiệp chính thức.*