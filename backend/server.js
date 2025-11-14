import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import routes
import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté - Base: movie_library'))
  .catch(err => console.log('❌ MongoDB erreur:', err.message));


// Page d'accueil
app.get('/', (req, res) => {
  res.json({ 
    message: '🎬 API Bibliothèque de Films',
    status: '✅ Serveur actif',
    database: '🟢 MongoDB connecté',
    entités: ['Users', 'Movies', 'Watchlists', 'Reviews'],
    endpoints: {
      users: 'GET/POST /api/users',
      movies: 'GET/POST /api/movies', 
      watchlists: 'GET/POST /api/watchlists',
      reviews: 'GET/POST /api/reviews'
    }
  });
});

// Routes API
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/watchlists', watchlistRoutes);
app.use('/api/reviews', reviewRoutes);

// Middleware pour routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur sur http://localhost:${PORT}`);
  console.log('🎬 API Bibliothèque de Films prête!');
});