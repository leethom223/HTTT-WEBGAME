import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import GameCard from '../components/GameCard';

export default function History() {
  const { isAuthenticated, openLoginModal } = useAuth();
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    setLoading(true);
    api.get('/history')
      .then((res) => {
        setHistoryItems(res.data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="empty-games-box" style={{ minHeight: '60vh' }}>
        <span className="empty-icon">🔒</span>
        <h2>Yêu Cầu Đăng Nhập</h2>
        <p>Vui lòng đăng nhập để xem lịch sử những trò chơi bạn đã từng tham gia.</p>
        <button className="btn-reset-filter" onClick={openLoginModal}>
          Đăng Nhập Ngay
        </button>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="catalog-header">
        <div className="catalog-title-group">
          <h1 className="catalog-heading">🕒 Lịch Sử Chơi Gần Đây</h1>
          <span className="catalog-count">({historyItems.length} lần chơi)</span>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Đang tải lịch sử chơi...</p>
        </div>
      ) : historyItems.length > 0 ? (
        <div className="games-grid">
          {historyItems.map((item) => (
            <div key={item.id} className="history-card-wrap">
              {item.game && <GameCard game={item.game} />}
              <span className="history-time-badge">
                Đã chơi: {new Date(item.played_at).toLocaleString('vi-VN')}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-games-box">
          <span className="empty-icon">🕹️</span>
          <h3>Bạn chưa chơi trò nào gần đây</h3>
          <p>Hãy chọn một trò chơi yêu thích từ trang chủ để bắt đầu trải nghiệm!</p>
          <Link to="/" className="btn-reset-filter">
            Khám phá trò chơi ngay
          </Link>
        </div>
      )}
    </div>
  );
}
