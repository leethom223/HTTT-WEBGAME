import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import GamePlayer from '../components/GamePlayer';
import GameCard from '../components/GameCard';

export default function GameDetail() {
  const { slug } = useParams();
  const { user, isAuthenticated, openLoginModal, fetchFavoritesCount } = useAuth();

  const [game, setGame] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);
  const [comments, setComments] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load Game Details
  useEffect(() => {
    setLoading(true);
    api.get(`/games/${slug}`)
      .then((res) => {
        const gameData = res.data.data;
        setGame(gameData);
        setRelatedGames(res.data.related || []);

        // Load Comments
        loadComments(gameData.id);

        // Record play history & check favorite/rating if user logged in
        if (isAuthenticated) {
          api.post(`/history/${gameData.id}`).catch(() => {});
          
          api.get(`/favorites/${gameData.id}/check`)
            .then((favRes) => setIsFavorited(favRes.data.is_favorited))
            .catch(() => {});

          api.get(`/games/${gameData.id}/ratings/me`)
            .then((rateRes) => setUserScore(rateRes.data.score || 0))
            .catch(() => {});
        }
      })
      .catch((err) => {
        console.error('Error loading game:', err);
      })
      .finally(() => setLoading(false));
  }, [slug, isAuthenticated]);

  const loadComments = (gameId) => {
    api.get(`/games/${gameId}/comments`)
      .then((res) => {
        setComments(res.data.data?.data || res.data.data || []);
      })
      .catch((err) => console.error(err));
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    try {
      const res = await api.post(`/favorites/${game.id}/toggle`);
      setIsFavorited(res.data.is_favorited);
      fetchFavoritesCount();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      const res = await api.post(`/games/${game.id}/comments`, {
        content: newComment.trim(),
      });
      setComments([res.data.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;

    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRatingUpdated = (newAvg) => {
    setGame({ ...game, rating_avg: newAvg });
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
        <p>Đang tải trò chơi...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="empty-games-box" style={{ minHeight: '60vh' }}>
        <span className="empty-icon">❌</span>
        <h2>Không tìm thấy trò chơi</h2>
        <p>Trò chơi bạn tìm kiếm có thể đã bị xóa hoặc không tồn tại.</p>
        <Link to="/" className="btn-reset-filter">Quay về trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="game-detail-page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        {game.categories && game.categories.length > 0 && (
          <>
            <Link to={`/category/${game.categories[0].slug}`}>
              {game.categories[0].name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="current">{game.title}</span>
      </div>

      {/* Game Title Bar */}
      <div className="game-header-bar">
        <div className="game-header-info">
          <h1 className="game-title">{game.title}</h1>
          <div className="game-tags">
            {game.categories?.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="game-tag-badge">
                {cat.icon || '🕹️'} {cat.name}
              </Link>
            ))}
            {game.badge && game.badge !== 'NORMAL' && (
              <span className={`game-badge-tag badge-${game.badge.toLowerCase()}`}>
                {game.badge}
              </span>
            )}
          </div>
        </div>

        <Link to="/" className="btn-back-home">
          ✕ Thoát Game
        </Link>
      </div>

      {/* Game Screen Player Component */}
      <GamePlayer
        game={game}
        isFavorited={isFavorited}
        onToggleFavorite={handleToggleFavorite}
        userScore={userScore}
        onRatingUpdated={handleRatingUpdated}
      />

      {/* Content Columns: Info & Comments on Left, Related on Right */}
      <div className="game-detail-layout">
        <div className="game-detail-main">
          {/* Controls & Description Card */}
          <div className="detail-card">
            <h3 className="detail-card-title">📖 Hướng Dẫn &amp; Điều Khiển</h3>
            <div className="controls-guide-box">
              <span className="control-icon">⌨️</span>
              <span className="control-text">
                {game.controls_guide || 'Sử dụng chuột và bàn phím (W, A, S, D hoặc các phím mũi tên) để chơi.'}
              </span>
            </div>

            <h3 className="detail-card-title" style={{ marginTop: '20px' }}>
              📝 Mô Tả Trò Chơi
            </h3>
            <p className="game-description-text">
              {game.description || 'Trải nghiệm tựa game hấp dẫn trực tiếp trên trình duyệt web không cần tải về máy.'}
            </p>
          </div>

          {/* Comment Community Card */}
          <div className="detail-card comment-card">
            <h3 className="detail-card-title">
              💬 Bình Luận Cộng Đồng ({comments.length})
            </h3>

            {/* Comment Form */}
            {isAuthenticated ? (
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <img
                  src={user.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=user'}
                  alt="avatar"
                  className="comment-form-avatar"
                />
                <div className="comment-input-wrap">
                  <textarea
                    placeholder="Viết cảm nghĩ hoặc mẹo chơi của bạn về trò chơi này..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="comment-textarea"
                    required
                  />
                  <button
                    type="submit"
                    className="btn-send-comment"
                    disabled={submittingComment || !newComment.trim()}
                  >
                    {submittingComment ? 'Đang gửi...' : '🚀 Gửi bình luận'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="comment-login-prompt">
                <span>🔒 Bạn cần đăng nhập để tham gia bình luận cùng cộng đồng.</span>
                <button className="btn-inline-login" onClick={openLoginModal}>
                  Đăng Nhập Ngay
                </button>
              </div>
            )}

            {/* Comments List */}
            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((cmt) => (
                  <div key={cmt.id} className="comment-item">
                    <img
                      src={cmt.user?.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=user'}
                      alt="avatar"
                      className="comment-avatar"
                    />
                    <div className="comment-body">
                      <div className="comment-header">
                        <div className="comment-user-info">
                          <span className="comment-author">{cmt.user?.name || 'Thành viên'}</span>
                          {cmt.user?.role === 'admin' && (
                            <span className="admin-badge-small">ADMIN</span>
                          )}
                        </div>
                        <span className="comment-time">
                          {new Date(cmt.created_at).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <p className="comment-content">{cmt.content}</p>
                      
                      {/* Delete comment if owner or admin */}
                      {isAuthenticated && (user.id === cmt.user_id || user.role === 'admin') && (
                        <button
                          className="btn-delete-comment"
                          onClick={() => handleDeleteComment(cmt.id)}
                          title="Xóa bình luận"
                        >
                          🗑️ Xóa
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-comments-box">
                  <p>Chưa có bình luận nào. Hãy là người đầu tiên để lại cảm nghĩ!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Related Games */}
        <div className="game-detail-sidebar">
          <div className="detail-card sidebar-card">
            <h3 className="detail-card-title">🔥 Trò Chơi Tương Tự</h3>
            <div className="related-games-list">
              {relatedGames.length > 0 ? (
                relatedGames.map((rel) => (
                  <Link key={rel.id} to={`/game/${rel.slug}`} className="related-game-item">
                    <img src={rel.thumbnail} alt={rel.title} className="related-thumb" />
                    <div className="related-info">
                      <h4 className="related-title">{rel.title}</h4>
                      <div className="related-meta">
                        <span>⭐ {Number(rel.rating_avg).toFixed(1)}</span>
                        <span>👁️ {Number(rel.play_count).toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="no-related-text">Chưa có trò chơi liên quan.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
