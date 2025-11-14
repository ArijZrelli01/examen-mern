import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Movie is required']
  },
  status: {
    type: String,
    enum: ['planned', 'watching', 'watched'],
    default: 'planned'
  },
  personalRating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  addedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

watchlistSchema.index({ user: 1, movie: 1 }, { unique: true });

export default mongoose.model('Watchlist', watchlistSchema);