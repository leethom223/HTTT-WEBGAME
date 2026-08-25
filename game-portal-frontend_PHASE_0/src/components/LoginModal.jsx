import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  if (!isLoginModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        if (formData.password !== formData.password_confirmation) {
          setError('Mật khẩu xác nhận không khớp!');
          setLoading(false);
          return;
        }
        await register(formData);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        const firstErr = Object.values(err.response.data.errors)[0][0];
        setError(firstErr);
      } else {
        setError('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLoginAdmin = () => {
    setFormData({
      ...formData,
      email: 'admin@gameportal.com',
      password: 'admin123',
    });
  };

  const handleQuickLoginMember = () => {
    setFormData({
      ...formData,
      email: 'gamer99@gmail.com',
      password: '123456',
    });
  };

  return (
    <div className="modal-backdrop" onClick={closeLoginModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeLoginModal}>✕</button>

        <div className="modal-tabs">
          <button
            className={`modal-tab ${!isRegister ? 'active' : ''}`}
            onClick={() => { setIsRegister(false); setError(''); }}
          >
            🔑 Đăng Nhập
          </button>
          <button
            className={`modal-tab ${isRegister ? 'active' : ''}`}
            onClick={() => { setIsRegister(true); setError(''); }}
          >
            ✨ Đăng Ký
          </button>
        </div>

        {error && <div className="auth-error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <>
              <div className="form-group">
                <label>Họ và Tên</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tên đăng nhập (Username)</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Ví dụ: gamer2026"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>{isRegister ? 'Địa chỉ Email' : 'Email hoặc Tên đăng nhập'}</label>
            <input
              type={isRegister ? 'email' : 'text'}
              name="email"
              placeholder={isRegister ? 'email@example.com' : 'admin@gameportal.com'}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                name="password_confirmation"
                placeholder="••••••••"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn-submit-auth" disabled={loading}>
            {loading ? 'Đang xử lý...' : (isRegister ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập Ngay')}
          </button>
        </form>

        {!isRegister && (
          <div className="quick-login-box">
            <p className="quick-login-title">⚡ Chọn tài khoản test nhanh:</p>
            <div className="quick-login-buttons">
              <button type="button" className="btn-quick-login admin" onClick={handleQuickLoginAdmin}>
                🛡️ Admin (admin@gameportal.com)
              </button>
              <button type="button" className="btn-quick-login member" onClick={handleQuickLoginMember}>
                🎮 Member (gamer99@gmail.com)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
