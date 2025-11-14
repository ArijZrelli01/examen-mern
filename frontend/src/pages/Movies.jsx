// pages/Movies.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies');
      
      // Vérifier la structure de la réponse
      console.log('Réponse API:', response.data);
      
      // S'assurer que movies est un tableau
      const moviesData = response.data.data || response.data || [];
      setMovies(Array.isArray(moviesData) ? moviesData : []);
      
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Erreur lors du chargement des films');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (movieId) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie && movie._id !== movieId));
  };

  if (loading) {
    return (
      <div className="movies-page">
        <div className="loading">Chargement des films...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movies-page">
        <div className="error-state">
          <h2>❌ Erreur</h2>
          <p>{error}</p>
          <button onClick={fetchMovies} className="btn-primary">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movies-page">
      <div className="page-header">
        <h1>🎥 Tous les Films</h1>
        <Link to="/add-movie" className="btn-primary">
          + Ajouter un Film
        </Link>
      </div>
      
      <div className="movies-grid">
        {!movies || movies.length === 0 ? (
          <div className="empty-state">
            <p>Aucun film trouvé</p>
            <Link to="/add-movie" className="btn-primary">
              Ajouter le premier film
            </Link>
          </div>
        ) : (
          movies
            .filter(movie => movie && typeof movie === 'object') // Filtrer les films valides
            .map(movie => (
              <MovieCard 
                key={movie._id} 
                movie={movie}
                onDelete={handleDelete}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Movies;