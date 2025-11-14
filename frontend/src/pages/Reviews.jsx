import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews');
      setReviews(response.data.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) return <div className="loading">Chargement des avis...</div>;

  return (
    <div className="reviews-page">
      <h1>⭐ Reviews - Relations Utilisateurs/Films</h1>
      
      <div className="reviews-grid">
        {reviews.length === 0 ? (
          <div className="empty-state">
            <p>Aucun avis trouvé</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="review-card">
              
              <div className="relation-info">
                <h3>🔗  Review</h3>
                { <p><strong>ID Relation:</strong> {review._id}</p> }
                </div>

              <div className="user-info">
                <h4>👤 Utilisateur</h4>
                <p><strong>ID User:</strong> {review.user?._id || 'Non trouvé'}</p>
                <p><strong>Nom:</strong> {review.user?.username || 'Utilisateur inconnu'}</p>
                <p><strong>Email:</strong> {review.user?.email || 'Non disponible'}</p>
              </div>

              <div className="movie-info">
                <h4>🎬 Film</h4>
                <p><strong>ID Movie:</strong> {review.movie?._id || 'Non trouvé'}</p>
                <p><strong>Titre:</strong> {review.movie?.title || 'Film inconnu'}</p>
                <p><strong>Réalisateur:</strong> {review.movie?.director || 'Non disponible'}</p>
              </div>

              <div className="review-details">
                <h4>⭐ Avis</h4>
                <p><strong>Note:</strong> {renderStars(review.rating)} ({review.rating}/5)</p>
                <p><strong>Commentaire:</strong> {review.comment}</p>
                <p><strong>Posté le:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;