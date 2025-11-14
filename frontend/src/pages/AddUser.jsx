import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: ''
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
      await axios.post('http://localhost:5000/api/users', formData);
      alert('Utilisateur ajouté avec succès!');
      navigate('/users');
    } catch (error) {
      alert('Erreur: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h1>👤 Ajouter un Nouvel Utilisateur</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nom d'utilisateur *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            placeholder="Description de l'utilisateur..."
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Ajout en cours...' : "Ajouter l'Utilisateur"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;