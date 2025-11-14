import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onDelete }) => {
   
  if (!movie) {
    return (
      <div className="movie-card movie-card-error">
        <div className="error-message"> Données du film non disponibles</div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${movie.title}" ?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/movies/${movie._id}`);
        onDelete(movie._id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du film');
      }
    }
  };

  return (
    <div className="movie-card">
      <h3>{movie.title || 'Titre non disponible'}</h3>
      <p><strong>Réalisateur:</strong> {movie.director || 'Non spécifié'}</p>
      <p><strong>Genre:</strong> {movie.genre || 'Non spécifié'}</p>
      <p><strong>Année:</strong> {movie.releaseYear || 'Non spécifié'}</p>
      <p><strong>Durée:</strong> {movie.duration ? `${movie.duration} min` : 'Non spécifié'}</p>
      {movie.synopsis && <p className="synopsis">{movie.synopsis}</p>}
      
      <div className="movie-actions">
        <Link 
          to={`/edit-movie/${movie._id}`}
          className="btn-edit"
        >
          ✏️ Modifier
        </Link>
        
        <button 
          onClick={handleDelete}
          className="btn-delete"
        >
          🗑️ Supprimer
        </button>
      </div>
    </div>
  );
};

export default MovieCard;