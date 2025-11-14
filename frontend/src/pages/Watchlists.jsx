import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watchlists = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const fetchWatchlists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/watchlists');
      setWatchlists(response.data.data || []);
    } catch (error) {
      console.error('Error fetching watchlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      'planned': '📅 À voir',
      'watching': '🎬 En cours',
      'watched': '✅ Vu'
    };
    return statusMap[status] || status;
  };

  if (loading) return <div className="loading">Chargement des watchlists...</div>;

  return (
    <div className="watchlists-page">
      <h1>📋 Watchlists - Relations Utilisateurs/Films</h1>
      
      <div className="watchlists-grid">
        {watchlists.length === 0 ? (
          <div className="empty-state">
            <p>Aucune watchlist trouvée</p>
          </div>
        ) : (
          watchlists.map(watchlist => (
            <div key={watchlist._id} className="watchlist-card">
              
               <div className="relation-info">
                <h3>🔗 Relation Watchlist</h3>
                <p><strong>ID Relation:</strong> {watchlist._id}</p>
              </div>

               <div className="user-info">
                <h4>👤 Utilisateur</h4>
                <p><strong>ID User:</strong> {watchlist.user?._id || 'Non trouvé'}</p>
                <p><strong>Nom:</strong> {watchlist.user?.username || 'Utilisateur inconnu'}</p>
                <p><strong>Email:</strong> {watchlist.user?.email || 'Non disponible'}</p>
              </div>

               <div className="movie-info">
                <h4>🎬 Film</h4>
                <p><strong>ID Movie:</strong> {watchlist.movie?._id || 'Non trouvé'}</p>
                <p><strong>Titre:</strong> {watchlist.movie?.title || 'Film inconnu'}</p>
                <p><strong>Réalisateur:</strong> {watchlist.movie?.director || 'Non disponible'}</p>
                <p><strong>Genre:</strong> {watchlist.movie?.genre || 'Non disponible'}</p>
                <p><strong>Année:</strong> {watchlist.movie?.releaseYear || 'Non disponible'}</p>
              </div>

               <div className="watchlist-details">
                <h4>📋 Détails Watchlist</h4>
                <p><strong>Statut:</strong> {getStatusLabel(watchlist.status)}</p>
                <p><strong>Ajouté le:</strong> {new Date(watchlist.addedDate).toLocaleDateString()}</p>
                {watchlist.personalRating ? (
                  <p><strong>Note personnelle:</strong> {watchlist.personalRating}/5</p>
                ) : (
                  <p><strong>Note personnelle:</strong> Non noté</p>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlists;