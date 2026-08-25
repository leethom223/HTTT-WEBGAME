import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/axios';
import GameCard from '../components/GameCard';

export default function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [featuredGames, setFeaturedGames] = useState([]);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);

  // Load Categories & Featured Banner
  useEffect(() => {
    api.get('/categories')
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error(err));

    api.get('/games/featured')
      .then((res) => setFeaturedGames(res.data.data || []))
      .catch((err) => console.error(err));
  }, []);

  // Load Games List based on filters
  useEffect(() => {
    setLoading(true);
    let url = `/games?sort=${sortBy}&all=true`;
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    if (selectedCategory !== 'all') {
      url += `&category=${encodeURIComponent(selectedCategory)}`;
    }

    api.get(url)
      .then((res) => {
        setGames(res.data.data || []);
      })
      .catch((err) => console.error('Error loading games:', err))
      .finally(() => setLoading(false));
  }, [searchQuery, selectedCategory, sortBy]);

  const heroGame = featuredGames.length > 0 ? featuredGames[0] : null;

  return (
    <div className="home-page">
      {/* Featured Hero Banner (Only when not searching) */}
      {!searchQuery && selectedCategory === 'all' && heroGame && (
        <section className="hero-banner-section">
          <div className="hero-banner-card">
            <div className="hero-banner-info">
              <span className="hero-badge">🔥 GAME NỔI BẬT NHẤT</span>
              <h1 className="hero-title">{heroGame.title}</h1>
              <p className="hero-desc">{heroGame.description}</p>
              
              <div className="hero-meta">
                <span className="hero-rating">⭐ {Number(heroGame.rating_avg).toFixed(1)} / 5.0</span>
                <span className="hero-plays">👁️ {Number(heroGame.play_count).toLocaleString()} lượt chơi</span>
              </div>

              <Link to={`/game/${heroGame.slug}`} className="btn-hero-play">
                ▶️ Chơi Ngay Bây Giờ
              </Link>
            </div>

            <div className="hero-banner-media">
              <img src={heroGame.thumbnail} alt={heroGame.title} className="hero-img" />
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <section className="catalog-section">
        <div className="catalog-header">
          <div className="catalog-title-group">
            <h2 className="catalog-heading">
              {searchQuery
                ? `🔍 Kết quả tìm kiếm cho: "${searchQuery}"`
                : selectedCategory === 'all'
                ? '🕹️ Danh Sách Tất Cả Trò Chơi'
                : `🕹️ Trò Chơi Thể Loại: ${categories.find(c => c.slug === selectedCategory)?.name || ''}`
              }
            </h2>
            <span className="catalog-count">({games.length} trò chơi)</span>
          </div>

          {/* Controls: Filter & Sort */}
          <div className="catalog-controls">
            {/* Quick Category Buttons */}
            <div className="category-pills">
              <button
                className={`pill-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                🌟 Tất cả
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`pill-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.slug)}
                >
                  <span>{cat.icon || '🎮'}</span> {cat.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="sort-wrapper">
              <label htmlFor="sortSelect">Sắp xếp:</label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popular">🔥 Chơi nhiều nhất</option>
                <option value="rating">⭐ Đánh giá cao nhất</option>
                <option value="latest">✨ Mới cập nhật</option>
              </select>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Đang tải danh sách trò chơi...</p>
          </div>
        ) : games.length > 0 ? (
          <div className="games-grid">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="empty-games-box">
            <span className="empty-icon">🎮</span>
            <h3>Không tìm thấy trò chơi phù hợp</h3>
            <p>Hãy thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục khác.</p>
            <button className="btn-reset-filter" onClick={() => setSelectedCategory('all')}>
              Xem tất cả game
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
