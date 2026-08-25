import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, isAuthenticated, openLoginModal, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="empty-games-box" style={{ minHeight: '60vh' }}>
        <span className="empty-icon">🔒</span>
        <h2>Yêu Cầu Đăng Nhập</h2>
        <p>Vui lòng đăng nhập để xem và cập nhật thông tin hồ sơ cá nhân.</p>
        <button className="btn-reset-filter" onClick={openLoginModal}>
          Đăng Nhập Ngay
        </button>
      </div>
    );
  }

  const avatarPresets = [
    'https://api.dicebear.com/7.x/adventurer/svg?seed=gamer99',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=shadow',
    'https://api.dicebear.com/7.x/bottts/svg?seed=cyber',
    'https://api.dicebear.com/7.x/bottts/svg?seed=admin',
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=pixel88',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    if (password && password !== passwordConfirmation) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setLoading(true);
    try {
      const data = { name, avatar };
      if (password) {
        data.password = password;
        data.password_confirmation = passwordConfirmation;
      }
      await updateProfile(data);
      setMsg('✅ Đã cập nhật thông tin hồ sơ thành công!');
      setPassword('');
      setPasswordConfirmation('');
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-heading">👤 Hồ Sơ Tài Khoản</h1>

        {msg && <div className="profile-toast-success">{msg}</div>}
        {error && <div className="auth-error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-avatar-section">
            <img src={avatar || user.avatar} alt="avatar" className="profile-large-avatar" />
            <div className="avatar-picker-wrap">
              <label className="form-label">Chọn Avatar mẫu phong cách Gaming:</label>
              <div className="avatar-options">
                {avatarPresets.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="preset"
                    className={`avatar-option ${avatar === url ? 'selected' : ''}`}
                    onClick={() => setAvatar(url)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Tên hiển thị</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Tên đăng nhập (Username)</label>
              <input type="text" value={user.username || ''} disabled className="input-disabled" />
            </div>

            <div className="form-group">
              <label>Địa chỉ Email</label>
              <input type="email" value={user.email || ''} disabled className="input-disabled" />
            </div>

            <div className="form-group">
              <label>Vai trò hệ thống</label>
              <input type="text" value={user.role === 'admin' ? '🛡️ Quản trị viên (Admin)' : '🎮 Thành viên (Member)'} disabled className="input-disabled" />
            </div>

            <div className="form-group">
              <label>Đổi mật khẩu mới (bỏ trống nếu không đổi)</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu mới..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Xác nhận mật khẩu mới</label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới..."
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-save-profile" disabled={loading}>
            {loading ? 'Đang lưu...' : '💾 Lưu Thay Đổi Hồ Sơ'}
          </button>
        </form>
      </div>
    </div>
  );
}
