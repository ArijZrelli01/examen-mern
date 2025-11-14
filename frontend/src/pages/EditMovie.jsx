import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMovie = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    duration: '120',
    synopsis: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
      if (response.data.success) {
        setFormData(response.data.data);
      } else {
        throw new Error('Film non trouvé');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Film non trouvé');
      navigate('/movies');
    } finally {
      setFetchLoading(false);
    }
  };

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
      const response = await axios.put(`http://localhost:5000/api/movies/${id}`, formData);
      
      if (response.data.success) {
        alert('Film modifié avec succès !');
        navigate('/movies');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      alert('Erreur: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="form-page">
        <div className="loading">Chargement du film...</div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <h1>✏️ Modifier le Film</h1>
      
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
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Année *</label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              min="1900"
              max="2030"
              required
            />
          </div>

          <div className="form-group">
            <label>Durée (min) *</label>
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
          <label>Synopsis</label>
          <textarea
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            rows="4"
            placeholder="Description du film..."
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/movies')} 
            className="btn-secondary"
          >
            Annuler
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Modification...' : 'Modifier le Film'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;