import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function GamePlayer({
  game,
  isFavorited,
  onToggleFavorite,
  userScore,
  onRatingUpdated,
}) {
  const { isAuthenticated, openLoginModal } = useAuth();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentScore, setCurrentScore] = useState(userScore || 0);
  const [hoverScore, setHoverScore] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [ratingMsg, setRatingMsg] = useState('');
  const playerContainerRef = useRef(null);

  const handleFullscreen = () => {
    const elem = playerContainerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleRate = async (score) => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    setRatingLoading(true);
    try {
      const res = await api.post(`/games/${game.id}/ratings`, { score });
      setCurrentScore(score);
      setRatingMsg(`✨ Cảm ơn bạn đã đánh giá ${score} sao!`);
      if (onRatingUpdated) {
        onRatingUpdated(res.data.rating_avg);
      }
      setTimeout(() => setRatingMsg(''), 3500);
    } catch (err) {
      console.error('Error rating game:', err);
    } finally {
      setRatingLoading(false);
    }
  };

  return (
    <div className="game-player-wrapper">
      {/* Game Screen Frame */}
      <div className="game-screen-box" ref={playerContainerRef}>
        <iframe
          src={game.play_url}
          title={game.title}
          className="game-iframe"
          allow="autoplay; fullscreen; gamepad; focus-without-user-activation *"
          allowFullScreen
        />
      </div>

      {/* Control Bar beneath game */}
      <div className="game-player-controls-bar">
        <div className="player-left-actions">
          {/* Favorite Button */}
          <button
            className={`btn-player-fav ${isFavorited ? 'active' : ''}`}
            onClick={onToggleFavorite}
          >
            {isFavorited ? '❤️ Đã yêu thích' : '🤍 Thêm yêu thích'}
          </button>

          {/* Star Rating Widget */}
          <div className="star-rating-widget">
            <span className="rating-label">Đánh giá:</span>
            <div className="stars-group" onMouseLeave={() => setHoverScore(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${
                    (hoverScore || currentScore) >= star ? 'filled' : ''
                  }`}
                  onMouseEnter={() => setHoverScore(star)}
                  onClick={() => handleRate(star)}
                  disabled={ratingLoading}
                >
                  ★
                </button>
              ))}
            </div>
            <span className="rating-score-text">
              {Number(game.rating_avg).toFixed(1)} / 5.0
            </span>
          </div>
        </div>

        <div className="player-right-actions">
          <span className="play-count-tag">
            👁️ {Number(game.play_count).toLocaleString()} lượt chơi
          </span>

          {/* Fullscreen Button */}
          <button className="btn-fullscreen" onClick={handleFullscreen} title="Toàn màn hình">
            ⛶ Phóng to
          </button>
        </div>
      </div>

      {ratingMsg && <div className="rating-feedback-toast">{ratingMsg}</div>}
    </div>
  );
}
