import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Users from './pages/Users';
import AddMovie from './pages/AddMovie';
import AddUser from './pages/AddUser';
import Watchlists from './pages/Watchlists';
import Reviews from './pages/Reviews';
import EditUser from './pages/EditUser';
import EditMovie from './pages/EditMovie';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/watchlists" element={<Watchlists />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/edit-movie/:id" element={<EditMovie />} />


          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;