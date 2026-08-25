import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="footer-logo-icon">🎮</span>
              <span className="footer-logo-text">GAMEX PORTAL</span>
            </div>
            <p className="footer-desc">
              Cổng trò chơi trực tuyến đa nền tảng hiện đại, hỗ trợ chuẩn HTML5 và Unity WebGL. Chơi mượt mà trên mọi trình duyệt không cần cài đặt.
            </p>
            <div className="tech-stack-badges">
              <span className="tech-badge">React 19</span>
              <span className="tech-badge">Laravel 11 API</span>
              <span className="tech-badge">MySQL 8.x</span>
              <span className="tech-badge">Sanctum Auth</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Thể loại trò chơi</h4>
            <ul className="footer-links">
              <li><Link to="/category/tri-tue">🧩 Game Trí tuệ</Link></li>
              <li><Link to="/category/arcade">🕹️ Game Arcade Cổ điển</Link></li>
              <li><Link to="/category/hanh-dong">⚔️ Game Hành động</Link></li>
              <li><Link to="/category/dua-xe">🏎️ Game Đua xe tốc độ</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Tài khoản &amp; Dịch vụ</h4>
            <ul className="footer-links">
              <li><Link to="/favorites">❤️ Danh sách yêu thích</Link></li>
              <li><Link to="/history">🕒 Lịch sử chơi game</Link></li>
              <li><Link to="/profile">👤 Thông tin cá nhân</Link></li>
              <li><Link to="/admin">🛡️ Quản trị viên (Admin)</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Thông tin Đồ án</h4>
            <ul className="footer-info">
              <li><strong>Đồ án:</strong> Hệ Thống Thông Tin WebGame</li>
              <li><strong>Mô hình:</strong> Single Page Application + REST API</li>
              <li><strong>Kiến trúc:</strong> 3-Tier Architecture</li>
              <li><strong>Trạng thái:</strong> ✅ Sẵn sàng hoạt động</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>© 2026 GameX Portal. Thiết kế &amp; Phát triển phục vụ Đồ Án Chuyên Ngành Hệ Thống Thông Tin.</p>
        </div>
      </div>
    </footer>
  );
}
