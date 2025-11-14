import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: 'Action',
    releaseYear: new Date().getFullYear(),
    duration: 120,
    synopsis: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/movies', formData);
      alert('Film ajouté avec succès!');
      navigate('/movies');
    } catch (error) {
      alert('Erreur: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Fantasy'];

  return (
    <div className="form-page">
      <h1>➕ Ajouter un Nouveau Film</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Titre *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Réalisateur *</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Genre *</label>
          <select name="genre" value={formData.genre} onChange={handleChange}>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Année de sortie *</label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              min="1888"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <div className="form-group">
            <label>Durée (minutes) *</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Ajout en cours...' : 'Ajouter le Film'}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;