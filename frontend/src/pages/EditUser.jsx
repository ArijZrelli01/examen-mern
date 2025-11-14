import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      setFormData(response.data);
    } catch (error) {
      alert('Utilisateur non trouvé');
      navigate('/users');
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
      await axios.put(`http://localhost:5000/api/users/${id}`, formData);
      alert('Utilisateur modifié avec succès !');
      navigate('/users');
    } catch (error) {
      alert('Erreur: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h1>✏️ Modifier l'Utilisateur</h1>
      
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

export default EditUser;