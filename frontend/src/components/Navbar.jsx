import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🎬 FilmLibrary</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/movies">Films</Link>
        <Link to="/add-movie">+ Film</Link>
        <Link to="/users">Utilisateurs</Link>
        <Link to="/add-user">+ User</Link>
        <Link to="/watchlists">Watchlists</Link>
        <Link to="/reviews">Reviews</Link>
      </div>
    </nav>
  );
};

export default Navbar;