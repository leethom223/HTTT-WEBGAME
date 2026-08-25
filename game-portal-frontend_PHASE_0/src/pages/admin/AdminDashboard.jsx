import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('games'); // 'games' | 'categories'
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Game Form State
  const [showGameModal, setShowGameModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [gameForm, setGameForm] = useState({
    title: '',
    slug: '',
    thumbnail: '',
    play_url: '',
    description: '',
    controls_guide: '',
    badge: 'NORMAL',
    status: 'published',
    category_ids: [],
  });

  // Category Form State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    icon: '🎮',
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    loadData();
  }, [isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [gamesRes, catsRes] = await Promise.all([
        api.get('/games?all=true'),
        api.get('/categories'),
      ]);
      setGames(gamesRes.data.data || []);
      setCategories(catsRes.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  // --- GAME CRUD ACTIONS ---
  const handleOpenAddGame = () => {
    setEditingGame(null);
    setGameForm({
      title: '',
      slug: '',
      thumbnail: '',
      play_url: '',
      description: '',
      controls_guide: '',
      badge: 'NORMAL',
      status: 'published',
      category_ids: [],
    });
    setShowGameModal(true);
  };

  const handleOpenEditGame = (game) => {
    setEditingGame(game);
    setGameForm({
      title: game.title,
      slug: game.slug,
      thumbnail: game.thumbnail,
      play_url: game.play_url,
      description: game.description || '',
      controls_guide: game.controls_guide || '',
      badge: game.badge || 'NORMAL',
      status: game.status || 'published',
      category_ids: game.categories ? game.categories.map((c) => c.id) : [],
    });
    setShowGameModal(true);
  };

  const handleSaveGame = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (editingGame) {
        await api.put(`/admin/games/${editingGame.id}`, gameForm);
        showNotification('✅ Đã cập nhật trò chơi thành công!');
      } else {
        await api.post('/admin/games', gameForm);
        showNotification('✅ Đã thêm mới trò chơi thành công!');
      }
      setShowGameModal(false);
      loadData();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Có lỗi xảy ra khi lưu game.');
    }
  };

  const handleDeleteGame = async (gameId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa game này?')) return;
    try {
      await api.delete(`/admin/games/${gameId}`);
      showNotification('🗑️ Đã xóa trò chơi thành công!');
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // --- CATEGORY CRUD ACTIONS ---
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: '', slug: '', icon: '🎮' });
    setShowCategoryModal(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({ name: cat.name, slug: cat.slug, icon: cat.icon || '🎮' });
    setShowCategoryModal(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.put(`/admin/categories/${editingCategory.id}`, categoryForm);
        showNotification('✅ Đã cập nhật danh mục!');
      } else {
        await api.post('/admin/categories', categoryForm);
        showNotification('✅ Đã thêm mới danh mục!');
      }
      setShowCategoryModal(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;
    try {
      await api.delete(`/admin/categories/${catId}`);
      showNotification('🗑️ Đã xóa danh mục thành công!');
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const totalPlays = games.reduce((sum, g) => sum + Number(g.play_count || 0), 0);

  return (
    <div className="admin-dashboard-page">
      <div className="admin-header-bar">
        <div>
          <h1 className="admin-page-title">🛡️ Bảng Điều Khiển Quản Trị (Admin CMS)</h1>
          <p className="admin-page-subtitle">Quản lý toàn bộ dữ liệu trò chơi, danh mục và phân quyền hệ thống</p>
        </div>
        <Link to="/" className="btn-view-site">🌐 Xem Website</Link>
      </div>

      {feedbackMsg && <div className="profile-toast-success">{feedbackMsg}</div>}

      {/* Stats Summary Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="stat-icon">🎮</span>
          <div className="stat-info">
            <span className="stat-num">{games.length}</span>
            <span className="stat-label">Tổng số Trò chơi</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">📂</span>
          <div className="stat-info">
            <span className="stat-num">{categories.length}</span>
            <span className="stat-label">Danh mục thể loại</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">👁️</span>
          <div className="stat-info">
            <span className="stat-num">{totalPlays.toLocaleString()}</span>
            <span className="stat-label">Tổng lượt chơi</span>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="admin-tabs-nav">
        <button
          className={`admin-tab-btn ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          🕹️ Quản Lý Trò Chơi ({games.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          📂 Quản Lý Danh Mục ({categories.length})
        </button>
      </div>

      {/* TAB 1: GAMES MANAGEMENT */}
      {activeTab === 'games' && (
        <div className="admin-tab-content">
          <div className="admin-section-actions">
            <h2 className="admin-section-title">Danh sách trò chơi hiện có</h2>
            <button className="btn-admin-add" onClick={handleOpenAddGame}>
              ➕ Thêm Mới Trò Chơi
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên Game</th>
                  <th>Thể loại</th>
                  <th>Huy hiệu</th>
                  <th>Lượt chơi</th>
                  <th>Đánh giá</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {games.map((g) => (
                  <tr key={g.id}>
                    <td>
                      <img src={g.thumbnail} alt={g.title} className="table-thumb" />
                    </td>
                    <td>
                      <strong>{g.title}</strong>
                      <br />
                      <small className="text-muted">{g.slug}</small>
                    </td>
                    <td>
                      {g.categories?.map((c) => (
                        <span key={c.id} className="table-tag">{c.name}</span>
                      ))}
                    </td>
                    <td>
                      <span className={`badge-pill badge-${g.badge?.toLowerCase()}`}>{g.badge}</span>
                    </td>
                    <td>{Number(g.play_count).toLocaleString()}</td>
                    <td>⭐ {Number(g.rating_avg).toFixed(1)}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-action edit" onClick={() => handleOpenEditGame(g)}>
                          ✏️ Sửa
                        </button>
                        <button className="btn-action delete" onClick={() => handleDeleteGame(g.id)}>
                          🗑️ Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES MANAGEMENT */}
      {activeTab === 'categories' && (
        <div className="admin-tab-content">
          <div className="admin-section-actions">
            <h2 className="admin-section-title">Danh sách danh mục thể loại</h2>
            <button className="btn-admin-add" onClick={handleOpenAddCategory}>
              ➕ Thêm Danh Mục Mới
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Tên Danh Mục</th>
                  <th>Slug (Đường dẫn)</th>
                  <th>Số game thuộc danh mục</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td style={{ fontSize: '1.5rem' }}>{cat.icon || '🕹️'}</td>
                    <td><strong>{cat.name}</strong></td>
                    <td><code>{cat.slug}</code></td>
                    <td>{cat.games_count || 0} trò chơi</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-action edit" onClick={() => handleOpenEditCategory(cat)}>
                          ✏️ Sửa
                        </button>
                        <button className="btn-action delete" onClick={() => handleDeleteCategory(cat.id)}>
                          🗑️ Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL ADD / EDIT GAME */}
      {showGameModal && (
        <div className="modal-backdrop" onClick={() => setShowGameModal(false)}>
          <div className="modal-content admin-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowGameModal(false)}>✕</button>
            <h2 className="modal-title">{editingGame ? '✏️ Chỉnh Sửa Trò Chơi' : '➕ Thêm Mới Trò Chơi'}</h2>

            {errorMsg && <div className="auth-error-box">{errorMsg}</div>}

            <form onSubmit={handleSaveGame} className="admin-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Tên trò chơi *</label>
                  <input
                    type="text"
                    value={gameForm.title}
                    onChange={(e) => setGameForm({ ...gameForm, title: e.target.value })}
                    placeholder="Ví dụ: Flappy Bird 3D"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Slug (Đường dẫn tĩnh)</label>
                  <input
                    type="text"
                    value={gameForm.slug}
                    onChange={(e) => setGameForm({ ...gameForm, slug: e.target.value })}
                    placeholder="flappy-bird-3d (tự tạo nếu để trống)"
                  />
                </div>

                <div className="form-group">
                  <label>URL Thumbnail (Hình ảnh) *</label>
                  <input
                    type="text"
                    value={gameForm.thumbnail}
                    onChange={(e) => setGameForm({ ...gameForm, thumbnail: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>URL Nhúng Trò Chơi (HTML5 / WebGL) *</label>
                  <input
                    type="text"
                    value={gameForm.play_url}
                    onChange={(e) => setGameForm({ ...gameForm, play_url: e.target.value })}
                    placeholder="https://play2048.co/ hoặc link nhúng game"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Huy hiệu nổi bật (Badge)</label>
                  <select
                    value={gameForm.badge}
                    onChange={(e) => setGameForm({ ...gameForm, badge: e.target.value })}
                  >
                    <option value="NORMAL">Bình thường (NORMAL)</option>
                    <option value="HOT">🔥 HOT</option>
                    <option value="NEW">✨ MỚI (NEW)</option>
                    <option value="WEBGL">🕹️ WEBGL 3D</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={gameForm.status}
                    onChange={(e) => setGameForm({ ...gameForm, status: e.target.value })}
                  >
                    <option value="published">Công khai (Published)</option>
                    <option value="draft">Bản nháp (Draft)</option>
                    <option value="hidden">Ẩn (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Gán vào Danh mục thể loại:</label>
                <div className="checkbox-group">
                  {categories.map((c) => (
                    <label key={c.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={gameForm.category_ids.includes(c.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setGameForm({
                              ...gameForm,
                              category_ids: [...gameForm.category_ids, c.id],
                            });
                          } else {
                            setGameForm({
                              ...gameForm,
                              category_ids: gameForm.category_ids.filter((id) => id !== c.id),
                            });
                          }
                        }}
                      />
                      <span>{c.icon || '🎮'} {c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Hướng dẫn điều khiển</label>
                <input
                  type="text"
                  value={gameForm.controls_guide}
                  onChange={(e) => setGameForm({ ...gameForm, controls_guide: e.target.value })}
                  placeholder="Ví dụ: Phím mũi tên để di chuyển, Phím Space nhảy"
                />
              </div>

              <div className="form-group">
                <label>Mô tả chi tiết</label>
                <textarea
                  value={gameForm.description}
                  onChange={(e) => setGameForm({ ...gameForm, description: e.target.value })}
                  rows={3}
                  placeholder="Giới thiệu nội dung và lối chơi của game..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowGameModal(false)}>
                  Hủy Bỏ
                </button>
                <button type="submit" className="btn-save">
                  💾 Lưu Dữ Liệu Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ADD / EDIT CATEGORY */}
      {showCategoryModal && (
        <div className="modal-backdrop" onClick={() => setShowCategoryModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCategoryModal(false)}>✕</button>
            <h2 className="modal-title">{editingCategory ? '✏️ Sửa Danh Mục' : '➕ Thêm Mới Danh Mục'}</h2>

            <form onSubmit={handleSaveCategory} className="admin-form">
              <div className="form-group">
                <label>Tên danh mục *</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="Ví dụ: Chiến thuật"
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug</label>
                <input
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  placeholder="chien-thuat"
                />
              </div>

              <div className="form-group">
                <label>Icon Emoji</label>
                <input
                  type="text"
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                  placeholder="♟️ hoặc 🕹️"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowCategoryModal(false)}>
                  Hủy Bỏ
                </button>
                <button type="submit" className="btn-save">
                  💾 Lưu Danh Mục
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
