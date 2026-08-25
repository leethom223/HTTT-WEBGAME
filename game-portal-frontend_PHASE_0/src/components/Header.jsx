import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Header() {
  const { user, isAuthenticated, isAdmin, logout, openLoginModal, favoritesCount } = useAuth();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.get('/categories')
      .then((res) => {
        setCategories(res.data.data || []);
      })
      .catch((err) => console.error('Error loading categories:', err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="main-header">
      <div className="header-top">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo-brand">
            <span className="logo-icon">🎮</span>
            <div className="logo-text-group">
              <span className="logo-title">GAMEX PORTAL</span>
              <span className="logo-subtitle">Cổng Game Trực Tuyến</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="🔍 Tìm kiếm game hành động, trí tuệ, đua xe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">Tìm</button>
          </form>

          {/* Right Action Icons */}
          <div className="header-actions">
            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="header-action-btn" title="Game yêu thích">
                  <span className="action-icon">❤️</span>
                  <span className="action-label">Yêu thích</span>
                  {favoritesCount > 0 && <span className="action-badge">{favoritesCount}</span>}
                </Link>

                <Link to="/history" className="header-action-btn" title="Lịch sử chơi">
                  <span className="action-icon">🕒</span>
                  <span className="action-label">Lịch sử</span>
                </Link>

                {isAdmin && (
                  <Link to="/admin" className="header-action-btn admin-btn" title="Quản trị hệ thống">
                    <span className="action-icon">🛡️</span>
                    <span className="action-label">Admin CMS</span>
                  </Link>
                )}

                {/* User Dropdown */}
                <div className="user-menu-wrapper">
                  <div
                    className="user-profile-trigger"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                  >
                    <img
                      src={user.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=user'}
                      alt="avatar"
                      className="user-avatar"
                    />
                    <div className="user-name-group">
                      <span className="user-name">{user.name}</span>
                      <span className={`user-role-badge ${user.role}`}>{user.role.toUpperCase()}</span>
                    </div>
                    <span className="dropdown-arrow">▼</span>
                  </div>

                  {showUserDropdown && (
                    <div className="user-dropdown-menu" onClick={() => setShowUserDropdown(false)}>
                      <Link to="/profile" className="dropdown-item">
                        👤 Hồ sơ cá nhân
                      </Link>
                      <Link to="/favorites" className="dropdown-item">
                        ❤️ Game đã lưu ({favoritesCount})
                      </Link>
                      <Link to="/history" className="dropdown-item">
                        🕒 Lịch sử vừa chơi
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="dropdown-item admin-link">
                          🛡️ Bảng điều khiển Admin
                        </Link>
                      )}
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item logout-btn" onClick={logout}>
                        🚪 Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button className="btn-login-header" onClick={openLoginModal}>
                <span className="login-icon">👤</span>
                <span>Đăng Nhập / Đăng Ký</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className="header-nav-bar">
        <div className="header-container">
          <ul className="category-nav-list">
            <li>
              <Link
                to="/"
                className={`category-nav-item ${location.pathname === '/' && !location.search ? 'active' : ''}`}
              >
                <span className="cat-icon">🌟</span> Tất cả game
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.slug}`}
                  className={`category-nav-item ${location.pathname === `/category/${cat.slug}` ? 'active' : ''}`}
                >
                  <span className="cat-icon">{cat.icon || '🕹️'}</span> {cat.name}
                  {cat.games_count > 0 && <span className="cat-count-badge">({cat.games_count})</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
