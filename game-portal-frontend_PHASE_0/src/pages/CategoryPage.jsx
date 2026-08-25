import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import GameCard from '../components/GameCard';

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    // Fetch Category Detail & Games
    api.get(`/categories/${slug}`)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => console.error(err));

    let url = `/games?category=${slug}&sort=${sortBy}&all=true`;
    if (search.trim()) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }

    api.get(url)
      .then((res) => {
        setGames(res.data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug, sortBy, search]);

  return (
    <div className="category-page">
      {/* Category Header Banner */}
      <div className="category-banner">
        <div className="category-banner-content">
          <div className="category-banner-icon">
            {category?.icon || '🕹️'}
          </div>
          <div className="category-banner-text">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link> <span>/</span> Thể loại <span>/</span> {category?.name || slug}
            </div>
            <h1 className="category-banner-title">
              Game {category?.name || slug}
            </h1>
            <p className="category-banner-desc">
              Tổng hợp những tựa game {category?.name?.toLowerCase()} hay nhất, chơi trực tuyến mượt mà không cần cài đặt.
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="catalog-header">
        <div className="catalog-title-group">
          <h2 className="catalog-heading">Danh sách ({games.length} trò chơi)</h2>
        </div>

        <div className="catalog-controls">
          <div className="category-search-box">
            <input
              type="text"
              placeholder="🔍 Lọc trong danh mục này..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input-small"
            />
          </div>

          <div className="sort-wrapper">
            <label htmlFor="catSort">Sắp xếp:</label>
            <select
              id="catSort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popular">🔥 Chơi nhiều nhất</option>
              <option value="rating">⭐ Đánh giá cao nhất</option>
              <option value="latest">✨ Mới nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Đang tải trò chơi trong danh mục...</p>
        </div>
      ) : games.length > 0 ? (
        <div className="games-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="empty-games-box">
          <span className="empty-icon">📂</span>
          <h3>Chưa có trò chơi trong danh mục này</h3>
          <p>Hãy quay lại trang chủ để khám phá thêm nhiều tựa game hấp dẫn khác.</p>
          <Link to="/" className="btn-reset-filter">
            Quay lại trang chủ
          </Link>
        </div>
      )}
    </div>
  );
}
