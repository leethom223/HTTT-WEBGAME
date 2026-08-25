import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function GameCard({ game, isFavoritedDefault = false, onFavoriteToggle }) {
  const { isAuthenticated, openLoginModal, fetchFavoritesCount } = useAuth();
  const [isFavorited, setIsFavorited] = useState(isFavoritedDefault);
  const [loadingFav, setLoadingFav] = useState(false);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    setLoadingFav(true);
    try {
      const res = await api.post(`/favorites/${game.id}/toggle`);
      setIsFavorited(res.data.is_favorited);
      fetchFavoritesCount();
      if (onFavoriteToggle) {
        onFavoriteToggle(game.id, res.data.is_favorited);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    } finally {
      setLoadingFav(false);
    }
  };

  return (
    <div className="game-card">
      <Link to={`/game/${game.slug}`} className="game-card-link">
        {/* Thumbnail Box */}
        <div className="game-card-thumb-wrap">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="game-card-thumb"
            loading="lazy"
          />

          {/* Badge */}
          {game.badge && game.badge !== 'NORMAL' && (
            <span className={`game-card-badge badge-${game.badge.toLowerCase()}`}>
              {game.badge}
            </span>
          )}

          {/* Favorite Button */}
          <button
            className={`btn-card-favorite ${isFavorited ? 'favorited' : ''}`}
            onClick={handleToggleFavorite}
            title={isFavorited ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            disabled={loadingFav}
          >
            {isFavorited ? '❤️' : '🤍'}
          </button>

          {/* Play Overlay Hover */}
          <div className="game-card-overlay">
            <span className="btn-card-play">▶ Chơi Ngay</span>
          </div>
        </div>

        {/* Info Box */}
        <div className="game-card-info">
          <h3 className="game-card-title" title={game.title}>{game.title}</h3>
          
          <div className="game-card-meta">
            <span className="game-card-category">
              {game.categories && game.categories.length > 0 ? (
                <>
                  <span className="meta-icon">{game.categories[0].icon || '🕹️'}</span>
                  {game.categories[0].name}
                </>
              ) : 'Trò chơi'}
            </span>

            <div className="game-card-stats">
              <span className="game-card-rating">⭐ {Number(game.rating_avg).toFixed(1)}</span>
              <span className="game-card-plays">👁️ {Number(game.play_count).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
