import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
       setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);  
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        alert('Utilisateur supprimé avec succès !');
        fetchUsers();
      } catch (error) {
        alert('Erreur: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const editUser = (userId) => {
    window.location.href = `/edit-user/${userId}`;
  };

  if (loading) return <div className="loading">Chargement des utilisateurs...</div>;

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>👥 Tous les Utilisateurs</h1>
        <a href="/add-user" className="btn-primary">+ Ajouter un Utilisateur</a>
      </div>
      
      <div className="users-grid">
        {users.length === 0 ? (
          <div className="empty-state">
            <p>Aucun utilisateur trouvé</p>
            <a href="/add-user" className="btn-primary">Ajouter le premier utilisateur</a>
          </div>
        ) : (
          users.map(user => (
            <UserCard 
              key={user._id} 
              user={user} 
              onDelete={deleteUser}
              onEdit={editUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Users;