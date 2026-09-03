import os

filename = "generate_docx.py"
with open(filename, "r", encoding="utf-8") as f:
    content = f.read()

# Let's find the start anchor (the first h3("3.2.2. Biểu đồ UseCase"))
start_anchor = '    h3("3.2.2.'
start_idx = content.find(start_anchor)

# Let's find the end anchor (the wireframe for Admin Dashboard CMS)
end_anchor = "    add_image_figure('Hinh_3_12_Wireframe_Bang_Dieu_Khien_Admin_Dashboard.png',"
end_idx = content.find(end_anchor)

print(f"Diagnostics: start_idx={start_idx}, end_idx={end_idx}")

if start_idx == -1:
    print(f"ERROR: Start anchor '{start_anchor}' not found!")
    exit(1)
if end_idx == -1:
    print(f"ERROR: End anchor '{end_anchor}' not found!")
    exit(1)

# Find the end of the line containing the end anchor
line_end_idx = content.find("\n", end_idx) + 1

part1 = content[:start_idx]
part3 = content[line_end_idx:]

new_section = """    h3("3.2.2. Biểu đồ UseCase")

    # ---- A. UseCase Tổng quát ----
    p("A. Biểu đồ UseCase Tổng quát hệ thống", bold=True, font_size=13, space_before=6)
    p("Biểu đồ UseCase tổng quát mô tả toàn bộ các chức năng chính của hệ thống và ranh giới tương tác giữa 3 nhóm tác nhân (Khách, Thành viên, Quản trị viên) với hệ thống Cổng Game Trực Tuyến. Trong đó:")
    p("• Khách (Guest) có thể thực hiện các chức năng cơ bản: Xem danh sách game (UC01), Tìm kiếm game (UC02), Chơi game trực tuyến (UC03) và Đăng ký / Đăng nhập (UC04).", bullet=True)
    p("• Thành viên (Member) kế thừa toàn bộ quyền của Khách, bổ sung thêm: Yêu thích game (UC05), Bình luận & Đánh giá (UC06), Xem lịch sử đã chơi (UC07).", bullet=True)
    p("• Quản trị viên (Admin CMS) sở hữu nhóm chức năng quản trị riêng biệt: Quản lý Game CRUD (UC08), Quản lý Danh mục CRUD (UC09), Quản lý Tài khoản người dùng (UC10), Kiểm duyệt Bình luận (UC11).", bullet=True)

    p("Bảng 3.3: Danh sách tổng hợp các UseCase của hệ thống", bold=True, space_after=4)

    # UseCase summary table
    uc_summary_table = doc.add_table(rows=12, cols=4)
    uc_summary_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(uc_summary_table)
    uc_sum_headers = ["Mã UC", "Tên UseCase", "Tác nhân", "Mức ưu tiên"]
    for i, hdr in enumerate(uc_sum_headers):
        cell = uc_summary_table.rows[0].cells[i]
        set_cell_background(cell, "1F4E78")
        set_cell_margins(cell, top=100, bottom=100, left=80, right=80)
        p_c = cell.paragraphs[0]
        p_c.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p_c.add_run(hdr)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(10.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    uc_sum_rows = [
        ("UC01", "Xem danh sách game", "Khách, Thành viên", "P0"),
        ("UC02", "Tìm kiếm game", "Khách, Thành viên", "P0"),
        ("UC03", "Chơi game trực tuyến", "Khách, Thành viên", "P0"),
        ("UC04", "Đăng ký / Đăng nhập", "Khách", "P0"),
        ("UC05", "Yêu thích game (Favorites)", "Thành viên", "P1"),
        ("UC06", "Bình luận & Đánh giá", "Thành viên", "P1"),
        ("UC07", "Xem lịch sử đã chơi", "Thành viên", "P1"),
        ("UC08", "Quản lý Game (CRUD)", "Quản trị viên", "P0"),
        ("UC09", "Quản lý Danh mục (CRUD)", "Quản trị viên", "P0"),
        ("UC10", "Quản lý Tài khoản người dùng", "Quản trị viên", "P0"),
        ("UC11", "Kiểm duyệt Bình luận", "Quản trị viên", "P1"),
    ]
    for r_idx, r_data in enumerate(uc_sum_rows):
        row = uc_summary_table.rows[r_idx + 1]
        bg = "F9FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(r_data):
            cell = row.cells[c_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, top=80, bottom=80, left=80, right=80)
            p_c = cell.paragraphs[0]
            p_c.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = p_c.add_run(val)
            run.font.name = 'Times New Roman'
            run.font.size = Pt(10)
            if c_idx == 0:
                run.font.bold = True

    add_image_figure('Hinh_3_1_UseCase_P0_Cot_Loi.png', 'Hình 3.1: Biểu đồ UseCase nhóm tính năng P0 (Cốt lõi)')

    p("Biểu đồ UseCase nhóm tính năng P1 (Nâng cao) mô tả các chức năng giúp tăng trải nghiệm tương tác của thành viên bao gồm: lưu game Yêu thích (UC07), ghi nhận Lịch sử chơi (UC08) và gửi Bình luận & Đánh giá (UC09). Phân hệ này cũng mô tả quyền hạn của Admin trong việc kiểm duyệt bình luận (UC10).")

    add_image_figure('Hinh_3_2_UseCase_P1_Nang_Cao.png', 'Hình 3.2: Biểu đồ UseCase nhóm tính năng P1 (Nâng cao)')

    p("Biểu đồ UseCase nhóm tính năng P2 (Mở rộng) bao gồm các chức năng: hiển thị Bảng xếp hạng (Leaderboard) (UC11) và tiếp nhận Báo lỗi / Góp ý (UC12) từ người dùng, kèm theo chức năng Quản lý tin tức / Sự kiện (UC13) dành cho Admin.")

    add_image_figure('Hinh_3_3_UseCase_P2_Mo_Rong.png', 'Hình 3.3: Biểu đồ UseCase nhóm tính năng P2 (Mở rộng)')

    # ---- B. UseCase Chi tiết ----
    p("B. Đặc tả UseCase chi tiết (UseCase Specifications)", bold=True, font_size=13, space_before=10)
    p("Phần này trình bày đặc tả chi tiết toàn bộ 11 UseCase của hệ thống theo chuẩn đồ án tốt nghiệp, bao gồm: mục tiêu, tác nhân tham gia, điều kiện tiên quyết, luồng sự kiện chính (Main Flow), luồng sự kiện phụ (Alternative Flow) và hậu điều kiện.")

    # Helper to create a 2-column UseCase specification table
    def add_spec_table(spec_rows):
        t = doc.add_table(rows=len(spec_rows), cols=2)
        t.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(t)
        for r_idx2, (label, value) in enumerate(spec_rows):
            bg2 = "F0F4FA" if r_idx2 % 2 == 0 else "FFFFFF"
            cell_l = t.rows[r_idx2].cells[0]
            cell_l.width = Inches(1.8)
            set_cell_background(cell_l, bg2)
            set_cell_margins(cell_l, top=80, bottom=80, left=100, right=60)
            p_l = cell_l.paragraphs[0]
            p_l.alignment = WD_ALIGN_PARAGRAPH.LEFT
            run_l = p_l.add_run(label)
            run_l.font.name = 'Times New Roman'
            run_l.font.size = Pt(11)
            run_l.font.bold = True
            run_l.font.color.rgb = RGBColor(0x1F, 0x4E, 0x78)

            cell_v = t.rows[r_idx2].cells[1]
            cell_v.width = Inches(4.7)
            set_cell_background(cell_v, bg2)
            set_cell_margins(cell_v, top=80, bottom=80, left=100, right=80)
            p_v = cell_v.paragraphs[0]
            p_v.alignment = WD_ALIGN_PARAGRAPH.LEFT
            run_v = p_v.add_run(value)
            run_v.font.name = 'Times New Roman'
            run_v.font.size = Pt(11)

    # --- UC01: Xem danh sách game ---
    p("Bảng 3.4: Đặc tả UseCase UC01 — Xem danh sách game (Browse Game List)", bold=True, space_after=4, space_before=8)
    add_spec_table([
        ("Mã UseCase", "UC01"),
        ("Tên UseCase", "Xem danh sách game (Browse Game List)"),
        ("Mục tiêu", "Giúp người dùng dễ dàng duyệt và tiếp cận các trò chơi được phân loại theo danh mục, mức độ hot hoặc mới."),
        ("Tác nhân", "Khách (Guest), Thành viên (Member)"),
        ("Điều kiện tiên quyết", "Người dùng truy cập vào trang chủ hoặc trang danh mục của hệ thống Cổng Game."),
        ("Luồng sự kiện chính\\n(Main Flow)",
         "1. Người dùng truy cập trang chủ hoặc trang danh mục của website.\\n"
         "2. Frontend gửi request GET /api/games hoặc GET /api/categories/{slug}/games lên Backend.\\n"
         "3. Backend nhận request, truy vấn danh sách game từ MySQL (lọc game theo danh mục/sắp xếp play_count).\\n"
         "4. Backend trả về danh sách game dạng JSON.\\n"
         "5. Frontend nhận dữ liệu và hiển thị danh sách thẻ game (thumbnail, tên game, lượt chơi, điểm đánh giá)."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Nếu danh mục chưa có trò chơi nào: Hệ thống hiển thị thông báo trống \\"Hiện chưa có trò chơi nào trong danh mục này\\"."),
        ("Hậu điều kiện", "Giao diện hiển thị trực quan danh sách trò chơi tương ứng theo yêu cầu lựa chọn của người dùng."),
    ])

    # --- UC02: Tìm kiếm game ---
    p("Bảng 3.5: Đặc tả UseCase UC02 — Tìm kiếm game (Search Game)", bold=True, space_after=4, space_before=12)
    add_spec_table([
        ("Mã UseCase", "UC02"),
        ("Tên UseCase", "Tìm kiếm game (Search Game)"),
        ("Mục tiêu", "Cho phép người chơi nhanh chóng tìm thấy trò chơi mong muốn bằng cách nhập từ khóa tìm kiếm."),
        ("Tác nhân", "Khách (Guest), Thành viên (Member)"),
        ("Điều kiện tiên quyết", "Người dùng đang ở trang chủ hoặc trang có thanh tìm kiếm (Navbar)."),
        ("Luồng sự kiện chính\\n(Main Flow)",
         "1. Người dùng nhập từ khóa tìm kiếm vào ô input tìm kiếm trên thanh Navbar.\\n"
         "2. Người dùng nhấn Enter hoặc nút Tìm kiếm.\\n"
         "3. Frontend gửi request GET /api/games?search={keyword} lên server.\\n"
         "4. Backend thực hiện truy vấn SQL với từ khóa (sử dụng toán tử LIKE tìm kiếm trong cột title và description).\\n"
         "5. Backend trả về kết quả dạng JSON.\\n"
         "6. Frontend hiển thị danh sách game tìm được lên trang kết quả tìm kiếm."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Nếu không tìm thấy kết quả phù hợp: Hệ thống hiển thị thông báo \\"Không tìm thấy kết quả phù hợp cho từ khóa '{keyword}'\\" và gợi ý danh sách game hot."),
        ("Hậu điều kiện", "Người dùng nhìn thấy danh sách các game trùng khớp hoặc gần đúng với từ khóa tìm kiếm."),
    ])

    # --- UC03: Chơi game trực tuyến ---
    p("Bảng 3.6: Đặc tả UseCase UC03 — Chơi game trực tuyến (Play Game)", bold=True, space_after=4, space_before=12)
    add_spec_table([
        ("Mã UseCase", "UC03"),
        ("Tên UseCase", "Chơi game trực tuyến (Play Game)"),
        ("Mục tiêu", "Cho phép người chơi trải nghiệm trò chơi ngay trên trình duyệt web mà không cần cài đặt bất kỳ phần mềm nào."),
        ("Tác nhân", "Khách (Guest), Thành viên (Member)"),
        ("Điều kiện tiên quyết", "Người dùng đã truy cập vào website và chọn một tựa game cụ thể từ trang chủ hoặc trang danh mục."),
        ("Luồng sự kiện chính\\n(Main Flow)",
         "1. Người dùng nhấp vào thẻ game trên trang chủ hoặc trang danh mục.\\n"
         "2. Hệ thống chuyển hướng đến trang chi tiết game (/game/:slug).\\n"
         "3. Frontend gửi request GET /api/games/{slug} lên server.\\n"
         "4. Backend trả về thông tin game, tăng biến đếm play_count lên 1 và trả về đường dẫn play_url.\\n"
         "5. Component <GamePlayer /> nhúng và khởi tạo khung game (<iframe /> hoặc Canvas WebGL).\\n"
         "6. Trò chơi tải hoàn tất và người dùng bắt đầu chơi."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Nếu là Thành viên đã đăng nhập: Hệ thống tự động ghi một bản ghi vào bảng play_history để lưu lại thời điểm chơi.\\n"
         "• Nếu đường dẫn game bị lỗi hoặc game đang bảo trì: Hệ thống hiển thị thông báo \\"Trò chơi đang bảo trì\\" và gợi ý danh sách các game liên quan cùng thể loại."),
        ("Hậu điều kiện", "Lượt chơi (play_count) của game tăng lên 1. Nếu là Thành viên, game xuất hiện trong danh sách Lịch sử chơi của người dùng."),
    ])

    # --- UC04: Đăng ký & Đăng nhập ---
    p("Bảng 3.7: Đặc tả UseCase UC04 — Đăng ký & Đăng nhập (Authentication)", bold=True, space_after=4, space_before=12)
    add_spec_table([
        ("Mã UseCase", "UC04"),
        ("Tên UseCase", "Đăng ký & Đăng nhập tài khoản (Authentication)"),
        ("Mục tiêu", "Cung cấp tài khoản định danh để người dùng sử dụng các tính năng dành riêng cho thành viên (Yêu thích, Bình luận, Lịch sử chơi)."),
        ("Tác nhân", "Khách (Guest)"),
        ("Điều kiện tiên quyết", "Khách chưa đăng nhập vào hệ thống (chưa có Token Sanctum hợp lệ trong localStorage)."),
        ("Luồng sự kiện chính\\n(Main Flow — Đăng ký)",
         "1. Người dùng nhấn nút \\"Đăng nhập\\" trên thanh Header và chọn tab \\"Đăng ký\\" trong modal.\\n"
         "2. Người dùng nhập: username, email, password, password_confirmation.\\n"
         "3. Frontend validate dữ liệu sơ bộ (kiểm tra email hợp lệ, mật khẩu >= 6 ký tự, 2 ô mật khẩu trùng khớp).\\n"
         "4. Frontend gửi request POST /api/register lên Backend.\\n"
         "5. Backend kiểm tra tính duy nhất của email/username, mã hóa mật khẩu bằng Bcrypt, lưu vào bảng users.\\n"
         "6. Backend sinh Token Sanctum và trả về cho Client kèm thông tin User.\\n"
         "7. Frontend lưu Token vào localStorage / AuthContext và chuyển trạng thái giao diện sang \\"Đã đăng nhập\\"."),
        ("Luồng sự kiện chính\\n(Main Flow — Đăng nhập)",
         "1. Người dùng nhấn nút \\"Đăng nhập\\" trên thanh Header.\\n"
         "2. Người dùng nhập email và password vào form đăng nhập.\\n"
         "3. Frontend gửi request POST /api/login.\\n"
         "4. Backend truy vấn bảng users theo email, sử dụng Hash::check() so sánh mật khẩu.\\n"
         "5. Nếu chính xác: Sinh Token Sanctum, trả về HTTP 200 + JSON {token, user}.\\n"
         "6. Nếu sai: Trả về HTTP 401 Unauthorized + thông báo \\"Sai thông tin đăng nhập\\".\\n"
         "7. Frontend lưu Token, cập nhật Header UI hiển thị tên và avatar người dùng."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Nếu email đã tồn tại khi đăng ký: Backend trả lỗi 422 Validation \\"Email đã được sử dụng\\".\\n"
         "• Nếu Token hết hạn hoặc bị thu hồi: Frontend tự động xóa Token cũ, hiển thị lại nút Đăng nhập và chuyển người dùng về trạng thái Khách."),
        ("Hậu điều kiện", "Người dùng có tài khoản hợp lệ và phiên làm việc được duy trì qua Token Sanctum. Giao diện Header cập nhật hiển thị tên + avatar."),
    ])

    # --- UC05: Yêu thích game ---
    p("Bảng 3.8: Đặc tả UseCase UC05 — Yêu thích game (Favorites)", bold=True, space_after=4, space_before=12)
    add_spec_table([
        ("Mã UseCase", "UC05"),
        ("Tên UseCase", "Yêu thích game (Favorites)"),
        ("Mục tiêu", "Cho phép Thành viên lưu lại trò chơi yêu thích để dễ dàng tìm kiếm và chơi lại sau này."),
        ("Tác nhân", "Thành viên (Member)"),
        ("Điều kiện tiên quyết", "Thành viên đã đăng nhập và đang ở trang chi tiết của một trò chơi cụ thể."),
        ("Luồng sự kiện chính",
         "1. Thành viên nhấn nút \\"Yêu thích\\" (biểu tượng trái tim) bên dưới khung chơi game.\\n"
         "2. Frontend gửi request POST /api/favorites kèm game_id và Token xác thực trong Header.\\n"
         "3. Backend nhận request, kiểm tra trong bảng favorites xem đã tồn tại quan hệ này chưa.\\n"
         "4. Nếu chưa: Thêm bản ghi mới liên kết user_id và game_id vào bảng favorites.\\n"
         "5. Backend phản hồi mã HTTP 200 kèm trạng thái yêu thích mới.\\n"
         "6. Frontend nhận phản hồi, thay đổi biểu tượng trái tim thành màu đỏ (Đã yêu thích)."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Nếu Thành viên nhấn trái tim đã đỏ: Hệ thống gửi request DELETE /api/favorites/{game_id} để hủy yêu thích, xóa bản ghi khỏi bảng favorites, icon đổi về màu trắng."),
        ("Hậu điều kiện", "Trò chơi được lưu/hủy khỏi danh sách yêu thích của người dùng trong CSDL."),
    ])

    # --- UC06: Bình luận & Đánh giá ---
    p("Bảng 3.9: Đặc tả UseCase UC06 — Bình luận & Đánh giá (Comments & Ratings)", bold=True, space_after=4, space_before=12)
    add_spec_table([
        ("Mã UseCase", "UC06"),
        ("Tên UseCase", "Bình luận & Đánh giá trò chơi (Comments & Ratings)"),
        ("Mục tiêu", "Cho phép Thành viên gửi ý kiến nhận xét và chấm điểm sao từ 1 đến 5 cho trò chơi để chia sẻ trải nghiệm cộng đồng."),
        ("Tác nhân", "Thành viên (Member)"),
        ("Điều kiện tiên quyết", "Thành viên đã đăng nhập thành công và đang ở trang chi tiết trò chơi."),
        ("Luồng sự kiện chính\\n(Gửi bình luận)",
         "1. Thành viên nhập nội dung bình luận vào ô input bình luận dưới khung game và nhấn \\"Gửi\\".\\n"
         "2. Frontend gửi request POST /api/comments kèm game_id, content và Token xác thực.\\n"
         "3. Backend lưu bình luận vào bảng comments và trả về bản ghi bình luận kèm tên, avatar của user.\\n"
         "4. Frontend nhận dữ liệu và hiển thị bình luận mới này ở đầu danh sách bình luận."),
        ("Luồng sự kiện chính\\n(Đánh giá sao)",
         "1. Thành viên chọn số sao từ 1 đến 5 để chấm điểm trò chơi.\\n"
         "2. Frontend gửi request POST /api/ratings kèm game_id, score và Token xác thực.\\n"
         "3. Backend kiểm tra: nếu user đã đánh giá game này trước đó thì cập nhật điểm score mới, ngược lại tạo bản ghi mới trong bảng ratings.\\n"
         "4. Backend tự động tính toán lại điểm trung bình rating_avg trong bảng games, phản hồi HTTP 200.\\n"
         "5. Giao diện cập nhật hiển thị điểm đánh giá sao trung bình mới của game."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Nếu bình luận trống hoặc thô tục: Backend validate trả về mã lỗi 422 Unprocessable Content và từ chối lưu."),
        ("Hậu điều kiện", "Ý kiến nhận xét được đăng tải và điểm số đánh giá trung bình của trò chơi được cập nhật trong CSDL."),
    ])

    # --- UC07: Xem lịch sử đã chơi ---
    p("Bảng 3.10: Đặc tả UseCase UC07 — Xem lịch sử đã chơi (Play History)", bold=True, space_after=4, space_before=12)
    add_spec_table([
        ("Mã UseCase", "UC07"),
        ("Tên UseCase", "Xem lịch sử các game đã chơi gần đây (Play History)"),
        ("Mục tiêu", "Giúp Thành viên xem lại danh sách các trò chơi mà mình đã trải nghiệm gần đây nhất."),
        ("Tác nhân", "Thành viên (Member)"),
        ("Điều kiện tiên quyết", "Thành viên đã đăng nhập thành công vào hệ thống."),
        ("Luồng sự kiện chính",
         "1. Khi chơi game (UC03), Backend tự động ghi nhận bản ghi chơi kèm thời gian vào bảng play_history.\\n"
         "2. Thành viên truy cập trang Profile cá nhân hoặc nhấn chọn \\"Game đã chơi gần đây\\".\\n"
         "3. Frontend gửi request GET /api/play-history kèm Token xác thực.\\n"
         "4. Backend truy vấn bảng play_history theo user_id, sắp xếp theo thời gian mới nhất (played_at DESC), trả về danh sách dạng JSON.\\n"
         "5. Frontend hiển thị danh sách game đã chơi dạng lưới (Grid) hoặc danh sách."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Nếu người dùng chưa chơi trò chơi nào gần đây: Giao diện hiển thị thông báo trống \\"Lịch sử chơi của bạn hiện chưa có dữ liệu\\"."),
        ("Hậu điều kiện", "Hệ thống hiển thị chính xác các game đã chơi gần đây của Thành viên theo thứ tự thời gian."),
    ])

    # --- UC08: Quản lý Game (Admin) ---
    p("Bảng 3.11: Đặc tả UseCase UC08 — Quản lý Game CRUD (Admin)", bold=True, space_after=4, space_before=12)
    add_spec_table([
        ("Mã UseCase", "UC08"),
        ("Tên UseCase", "Quản lý Game — CRUD (Admin Create/Read/Update/Delete Game)"),
        ("Mục tiêu", "Cho phép Quản trị viên thêm mới, xem danh sách, cập nhật thông tin, thay đổi ảnh đại diện và xóa trò chơi khỏi hệ thống."),
        ("Tác nhân", "Quản trị viên (Admin)"),
        ("Điều kiện tiên quyết", "Quản trị viên đã đăng nhập với tài khoản có role = 'admin' và Token Sanctum hợp lệ."),
        ("Luồng sự kiện chính\\n(Main Flow — Thêm\\nmới Game)",
         "1. Admin truy cập trang /admin/games và nhấn nút \\"Thêm Game Mới\\".\\n"
         "2. Admin điền các trường: Tên game, Danh mục (chọn nhiều), Mô tả, Hướng dẫn phím, play_url (link nhúng hoặc file upload), tải lên file ảnh thumbnail.\\n"
         "3. Nhấn \\"Lưu trò chơi\\", Frontend gửi POST /api/admin/games dạng multipart/form-data kèm Token xác thực.\\n"
         "4. Middleware IsAdmin kiểm tra quyền — nếu không phải Admin trả về HTTP 403 Forbidden.\\n"
         "5. Controller validate dữ liệu, lưu file thumbnail vào storage/app/public/thumbnails, tạo bản ghi trong bảng games và liên kết trong bảng game_category.\\n"
         "6. Hệ thống phản hồi mã HTTP 201 Created và cập nhật lại danh sách game trên giao diện Admin."),
        ("Luồng sự kiện chính\\n(Main Flow — Sửa)",
         "1. Admin chọn game cần sửa từ danh sách, nhấn nút \\"Chỉnh sửa\\".\\n"
         "2. Form hiển thị dữ liệu hiện tại của game (pre-filled).\\n"
         "3. Admin thay đổi thông tin cần cập nhật.\\n"
         "4. Frontend gửi PUT /api/admin/games/{id} kèm Token xác thực.\\n"
         "5. Backend cập nhật bản ghi trong bảng games, trả về HTTP 200 OK."),
        ("Luồng sự kiện chính\\n(Main Flow — Xóa)",
         "1. Admin nhấn nút \\"Xóa\\" trên dòng game cần xóa.\\n"
         "2. Hệ thống hiển thị hộp thoại xác nhận \\"Bạn có chắc muốn xóa game này?\\".\\n"
         "3. Admin xác nhận, Frontend gửi DELETE /api/admin/games/{id}.\\n"
         "4. Backend xóa game và toàn bộ dữ liệu liên quan (comments, ratings, favorites, play_history) nhờ ràng buộc ON DELETE CASCADE.\\n"
         "5. Trả về HTTP 200 OK, cập nhật lại danh sách."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Nếu người dùng thường cố gắng truy cập API admin: Middleware IsAdmin chặn và trả về HTTP 403 Forbidden.\\n"
         "• Nếu tên game trùng slug đã tồn tại hoặc file thumbnail không đúng định dạng: Backend trả lỗi 422 Validation."),
        ("Hậu điều kiện", "Game mới được tạo/cập nhật/xóa thành công. Thay đổi xuất hiện ngay lập tức trên trang chủ và trang danh mục của người dùng."),
    ])

    # --- UC09: Quản lý Danh mục (Admin) ---
    p("Bảng 3.12: Đặc tả UseCase UC09 — Quản lý Danh mục CRUD (Admin)", bold=True, space_after=4, space_before=12)
    add_spec_table([
        ("Mã UseCase", "UC09"),
        ("Tên UseCase", "Quản lý Danh mục — CRUD (Admin Category CRUD)"),
        ("Mục tiêu", "Cho phép Quản trị viên thêm mới, cập nhật, hiển thị và xóa các thể loại / danh mục trò chơi trên trang web."),
        ("Tác nhân", "Quản trị viên (Admin)"),
        ("Điều kiện tiên quyết", "Quản trị viên đã đăng nhập thành công với quyền Admin và có Token hợp lệ."),
        ("Luồng sự kiện chính\\n(Main Flow — Thêm)",
         "1. Admin truy cập mục \\"Quản lý Danh mục\\" trong Admin CMS.\\n"
         "2. Nhấn nút \\"Thêm danh mục\\", nhập tên danh mục (ví dụ: 'Trí tuệ') và biểu tượng emoji/svg.\\n"
         "3. Bấm \\"Lưu\\", Frontend gửi request POST /api/admin/categories kèm Token xác thực.\\n"
         "4. Backend tự động tạo slug từ tên danh mục, kiểm tra tính duy nhất, tạo bản ghi mới trong bảng categories.\\n"
         "5. Trả về HTTP 201 Created và hiển thị danh mục mới trên bảng quản lý."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Sửa / Xóa danh mục: Admin nhấn Sửa (PUT /api/admin/categories/{id}) để cập nhật thông tin, hoặc nhấn Xóa (DELETE /api/admin/categories/{id}) để gỡ danh mục khỏi CSDL. Ràng buộc khóa ngoại sẽ tự động gỡ liên kết danh mục này khỏi các game trong bảng game_category."),
        ("Hậu điều kiện", "Thông tin danh mục được tạo mới/cập nhật/xóa khỏi cơ sở dữ liệu. Menu thể loại trên trang chủ thay đổi tương ứng."),
    ])

    # --- UC10: Quản lý Tài khoản người dùng (Admin) ---
    p("Bảng 3.13: Đặc tả UseCase UC10 — Quản lý Tài khoản người dùng (Admin)", bold=True, space_after=4, space_before=12)
    add_spec_table([
        ("Mã UseCase", "UC10"),
        ("Tên UseCase", "Quản lý Tài khoản người dùng (Admin User Management)"),
        ("Mục tiêu", "Giúp Quản trị viên theo dõi danh sách thành viên đăng ký, thay đổi quyền hạn hoặc thực hiện khóa tài khoản vi phạm."),
        ("Tác nhân", "Quản trị viên (Admin)"),
        ("Điều kiện tiên quyết", "Quản trị viên đã đăng nhập thành công với quyền Admin."),
        ("Luồng sự kiện chính\\n(Main Flow)",
         "1. Admin vào mục \\"Quản lý người dùng\\" trên trang Admin CMS.\\n"
         "2. Frontend gửi request GET /api/admin/users kèm Token xác thực.\\n"
         "3. Backend truy vấn CSDL và lấy danh sách thành viên trong bảng users, trả về JSON.\\n"
         "4. Admin theo dõi danh sách, phát hiện tài khoản vi phạm (ví dụ: bình luận thô tục nhiều lần) và nhấn nút \\"Khóa tài khoản\\".\\n"
         "5. Frontend gửi request POST /api/admin/users/{id}/block.\\n"
         "6. Backend cập nhật trạng thái hoạt động của tài khoản trong CSDL thành blocked và trả về HTTP 200 OK.\\n"
         "7. Màn hình quản lý cập nhật trạng thái tài khoản thành \\"Đã khóa\\"."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Nếu Admin cố tình khóa tài khoản của chính mình hoặc admin cấp cao khác: Backend chặn và trả về HTTP 403 Forbidden."),
        ("Hậu điều kiện", "Trạng thái hoạt động hoặc quyền của tài khoản người dùng được cập nhật trong CSDL. Người dùng bị khóa sẽ không thể đăng nhập."),
    ])

    # --- UC11: Kiểm duyệt Bình luận (Admin) ---
    p("Bảng 3.14: Đặc tả UseCase UC11 — Kiểm duyệt Bình luận (Admin)", bold=True, space_after=4, space_before=12)
    add_spec_table([
        ("Mã UseCase", "UC11"),
        ("Tên UseCase", "Kiểm duyệt Bình luận (Comment Moderation)"),
        ("Mục tiêu", "Cho phép Quản trị viên loại bỏ các bình luận không phù hợp, thô tục trên trang chi tiết game nhằm giữ gìn văn hóa cộng đồng."),
        ("Tác nhân", "Quản trị viên (Admin)"),
        ("Điều kiện tiên quyết", "Quản trị viên đã đăng nhập thành công với quyền Admin."),
        ("Luồng sự kiện chính\\n(Main Flow)",
         "1. Admin truy cập mục \\"Kiểm duyệt Bình luận\\" trong trang Admin CMS.\\n"
         "2. Giao diện gửi request GET /api/admin/comments để lấy danh sách tất cả bình luận mới nhất xếp theo thời gian.\\n"
         "3. Admin xem xét nội dung các bình luận.\\n"
         "4. Phát hiện bình luận vi phạm, Admin nhấn nút \\"Xóa bình luận\\".\\n"
         "5. Frontend gửi request DELETE /api/admin/comments/{id} kèm Token xác thực.\\n"
         "6. Backend xóa bản ghi bình luận đó khỏi bảng comments và trả về mã HTTP 200.\\n"
         "7. Giao diện Admin loại bỏ bình luận đó ra khỏi danh sách hiển thị."),
        ("Luồng sự kiện phụ\\n(Alternative Flow)",
         "• Nếu bình luận đã được xóa trước đó bởi chủ nhân: Backend trả lỗi 404 Not Found, Frontend tự động cập nhật lại danh sách."),
        ("Hậu điều kiện", "Bình luận vi phạm bị xóa hoàn toàn khỏi cơ sở dữ liệu và không còn hiển thị dưới trang chi tiết game ngoài trang chủ."),
    ])

    h3("3.2.3. Biểu đồ hoạt động")
    p("Biểu đồ hoạt động mô tả chi tiết luồng nghiệp vụ dữ liệu xử lý trong hai tình huống quan trọng của hệ thống: Luồng đăng nhập xác thực và luồng chơi game ghi nhận lịch sử.")

    add_image_figure('Hinh_3_3_So_Do_Hoat_Dong_Dang_Nhap_Xac_Thuc.png', 'Hình 3.4: Biểu đồ Hoạt động Luồng Đăng nhập và Xác thực người dùng')
    add_image_figure('Hinh_3_4_So_Do_Hoat_Dong_Choi_Game_Va_Ghi_Lich_Su.png', 'Hình 3.5: Biểu đồ Hoạt động Luồng Chơi game và Tự động ghi Lịch sử')

    p("Bên cạnh các sơ đồ hoạt động, đặc tả UseCase quy định rõ điều kiện tiên quyết, luồng sự kiện chính và hậu điều kiện cho từng tính năng cốt lõi (UC03: Chơi game trực tuyến, UC04: Đăng ký & Đăng nhập, UC08: Quản lý Game Admin).")

    h3("3.2.4. Biểu đồ trình tự")
    p("Biểu đồ trình tự thể hiện sự tương tác theo trục thời gian giữa trình duyệt Client, hệ thống React Frontend, Controllers backend Laravel, Middleware Sanctum và MySQL Database:")

    add_image_figure('Hinh_3_5_So_Do_Tuan_Tu_Dang_Nhap_Tai_Khoan.png', 'Hình 3.6: Biểu đồ Trình tự Tính năng Đăng nhập Tài khoản người dùng')
    add_image_figure('Hinh_3_6_So_Do_Tuan_Tu_Admin_Them_Moi_Game.png', 'Hình 3.7: Biểu đồ Trình tự Tính năng Admin Thêm mới Trò chơi')

    h3("3.2.5. Biểu đồ lớp")
    p("Biểu đồ lớp biểu diễn cấu trúc tĩnh của hệ thống, bao gồm các lớp đối tượng thực thể (Models: User, Game, Category, Comment, Rating, Favorite, PlayHistory) và các lớp điều khiển nghiệp vụ (Controllers: AuthController, GameController, CategoryController, CommentController, RatingController, FavoriteController). Các lớp Model tương tác chặt chẽ với Eloquent ORM để thực hiện các thao tác CRUD và thiết lập mối quan hệ giữa các thực thể.")

    h2("3.3. Thiết kế hệ thống")

    h3("3.3.1. Thiết kế tổng thể")
    p("Hệ thống được thiết kế theo mô hình 3 lớp phân tách (3-Tier Decoupled Architecture): Tầng Trình diễn (Presentation Layer - React 19 SPA), Tầng Nghiệp vụ (Business Logic Layer - Laravel 11 RESTful API), và Tầng Dữ liệu (Data Access Layer - MySQL 8.x).")

    add_image_figure('Hinh_3_7_So_Do_Kien_Truc_He_Thong_3_Lop.png', 'Hình 3.8: Sơ đồ Kiến trúc Hệ thống 3 Lớp Phân tách (3-Tier Decoupled Architecture)')

    h3("3.3.2. Thiết kế chi tiết")
    p("Thiết kế chi tiết bao gồm Sơ đồ Thực thể Quan hệ CSDL (ERD), Từ điển dữ liệu 8 bảng chuẩn hóa và Bố cục Wireframe các trang giao diện người dùng:")

    add_image_figure('Hinh_3_8_So_Do_Thuc_Te_Quan_He_CSDL_ERD.png', 'Hình 3.9: Sơ đồ Thực thể Quan hệ CSDL (ERD - Entity Relationship Diagram)')

    p("Bảng 3.15: Từ điển dữ liệu bảng `users` (Tài khoản người dùng)", bold=True, space_after=4)
    table_u = doc.add_table(rows=9, cols=5)
    table_u.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table_u)

    u_headers = ["Tên cột", "Kiểu dữ liệu", "Khóa", "Ràng buộc", "Mô tả"]
    for i, h in enumerate(u_headers):
        cell = table_u.rows[0].cells[i]
        set_cell_background(cell, "1F4E78")
        set_cell_margins(cell, top=100, bottom=100, left=80, right=80)
        p_c = cell.paragraphs[0]
        p_c.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p_c.add_run(h)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(10.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    u_rows = [
        ("id", "BIGINT UNSIGNED", "PK", "AUTO_INCREMENT", "Mã định danh người dùng"),
        ("username", "VARCHAR(50)", "", "UNIQUE, NOT NULL", "Tên tài khoản người dùng"),
        ("email", "VARCHAR(100)", "", "UNIQUE, NOT NULL", "Địa chỉ email đăng nhập"),
        ("password", "VARCHAR(255)", "", "NOT NULL", "Mật khẩu mã hóa Bcrypt"),
        ("avatar", "VARCHAR(255)", "", "NULLABLE", "Đường dẫn ảnh đại diện"),
        ("role", "ENUM('member','admin')", "", "DEFAULT 'member'", "Phân quyền tài khoản"),
        ("created_at", "TIMESTAMP", "", "NULLABLE", "Thời điểm tạo tài khoản"),
        ("updated_at", "TIMESTAMP", "", "NULLABLE", "Thời điểm cập nhật cuối")
    ]

    for r_idx, r_data in enumerate(u_rows):
        row = table_u.rows[r_idx + 1]
        bg = "F9FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(r_data):
            cell = row.cells[c_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, top=80, bottom=80, left=80, right=80)
            p_c = cell.paragraphs[0]
            p_c.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx in [0, 2] else WD_ALIGN_PARAGRAPH.LEFT
            run = p_c.add_run(val)
            run.font.name = 'Times New Roman'
            run.font.size = Pt(10)
            if c_idx == 0:
                run.font.bold = True

    p("Các bảng dữ liệu khác gồm `categories`, `games`, `game_category`, `comments`, `ratings`, `favorites`, và `play_history` được thiết kế đồng bộ với đầy đủ chỉ mục index và ràng buộc khóa ngoại ON DELETE CASCADE.")

    add_image_figure('Hinh_3_9_Wireframe_Bo_Cuc_Trang_Chu.png', 'Hình 3.10: Wireframe Bố cục Trang chủ Cổng game Trực tuyến')
    add_image_figure('Hinh_3_10_Wireframe_Bo_Cuc_Man_Hinh_Choi_Game.png', 'Hình 3.11: Wireframe Bố cục Màn hình Chơi game (<GamePlayer />)')
    add_image_figure('Hinh_3_11_Wireframe_Bo_Cuc_Trang_Danh_Muc.png', 'Hình 3.12: Wireframe Bố cục Trang Danh mục Trò chơi')
    add_image_figure('Hinh_3_12_Wireframe_Bang_Dieu_Khien_Admin_Dashboard.png', 'Hình 3.13: Wireframe Bảng Điều Khiển Quản Trị (Admin Dashboard CMS)')
"""

with open(filename, "w", encoding="utf-8") as f:
    f.write(part1 + new_section + part3)

print("Patched generate_docx.py successfully!")
