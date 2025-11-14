import React from 'react';

const UserCard = ({ user, onDelete, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.username}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio || 'Aucune bio'}</p>
      
      <div className="user-actions">
        <button 
          onClick={() => onEdit(user._id)}
          className="btn-edit"
        >
          ✏️ Modifier
        </button>
        
        <button 
          onClick={() => onDelete(user._id)}
          className="btn-delete"
        >
          🗑️ Supprimer
        </button>
      </div>
    </div>
  );
};

export default UserCard;