import express from 'express';
import {
  getWatchlists,
  getWatchlistById,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
  checkWatchlistItem
} from '../controllers/watchlistController.js';

const router = express.Router();

router.get('/', getWatchlists);
router.get('/:id', getWatchlistById);
router.post('/', createWatchlist);
router.put('/:id', updateWatchlist);
router.delete('/:id', deleteWatchlist);
router.get('/user/:userId/movie/:movieId', checkWatchlistItem);

export default router;