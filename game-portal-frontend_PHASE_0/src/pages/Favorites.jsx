import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import GameCard from '../components/GameCard';

export default function Favorites() {
  const { isAuthenticated, openLoginModal } = useAuth();
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    setLoading(true);
    api.get('/favorites')
      .then((res) => {
        setFavoriteGames(res.data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const handleFavoriteToggle = (gameId, isFav) => {
    if (!isFav) {
      setFavoriteGames(favoriteGames.filter((g) => g.id !== gameId));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="empty-games-box" style={{ minHeight: '60vh' }}>
        <span className="empty-icon">🔒</span>
        <h2>Yêu Cầu Đăng Nhập</h2>
        <p>Vui lòng đăng nhập để xem và quản lý danh sách các trò chơi yêu thích của bạn.</p>
        <button className="btn-reset-filter" onClick={openLoginModal}>
          Đăng Nhập Ngay
        </button>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="catalog-header">
        <div className="catalog-title-group">
          <h1 className="catalog-heading">❤️ Game Yêu Thích Của Tôi</h1>
          <span className="catalog-count">({favoriteGames.length} trò chơi)</span>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Đang tải danh sách yêu thích...</p>
        </div>
      ) : favoriteGames.length > 0 ? (
        <div className="games-grid">
          {favoriteGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isFavoritedDefault={true}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      ) : (
        <div className="empty-games-box">
          <span className="empty-icon">💔</span>
          <h3>Chưa có trò chơi nào trong danh sách yêu thích</h3>
          <p>Hãy bấm vào biểu tượng trái tim ở các trò chơi để lưu lại và chơi bất cứ lúc nào!</p>
          <Link to="/" className="btn-reset-filter">
            Khám phá trò chơi ngay
          </Link>
        </div>
      )}
    </div>
  );
}
