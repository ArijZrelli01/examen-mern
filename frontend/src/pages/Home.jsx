import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [stats, setStats] = useState({
    movies: 0,
    users: 0,
    watchlists: 0,
    reviews: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [moviesRes, usersRes, watchlistsRes, reviewsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/movies'),
        axios.get('http://localhost:5000/api/users'),
        axios.get('http://localhost:5000/api/watchlists'),
        axios.get('http://localhost:5000/api/reviews')
      ]);

      setStats({
        movies: moviesRes.data.data?.length || 0,
        users: usersRes.data.data?.length || 0,
        watchlists: watchlistsRes.data.data?.length || 0,
        reviews: reviewsRes.data.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="home">
      <h1>🎬 Bienvenue dans votre Bibliothèque de Films</h1>
      <p>Gérez votre collection de films, utilisateurs et avis</p>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">{stats.movies}</div>
          <div className="stat-label">Films</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.users}</div>
          <div className="stat-label">Utilisateurs</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.watchlists}</div>
          <div className="stat-label">Watchlists</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.reviews}</div>
          <div className="stat-label">Avis</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Actions Rapides</h2>
        <div className="action-buttons">
          <a href="/add-movie" className="action-btn">➕ Ajouter un Film</a>
          <a href="/add-user" className="action-btn">👤 Ajouter un Utilisateur</a>
          <a href="/movies" className="action-btn">🎥 Voir tous les Films</a>
          <a href="/users" className="action-btn">👥 Voir les Utilisateurs</a>
        </div>
      </div>
    </div>
  );
};

export default Home;