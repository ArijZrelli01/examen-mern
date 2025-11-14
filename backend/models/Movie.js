import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    //enum: ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Fantasy']
  },
  releaseYear: {
    type: Number,
    required: [true, 'Release year is required'],
    min: [1888, 'Release year must be after 1888']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  poster: {
    type: String,
    default: '/uploads/posters/default-movie.jpg'
  },
  synopsis: {
    type: String,
    required: [true, 'Synopsis is required'],
    minlength: [10, 'Synopsis must be at least 10 characters']
  }
}, {
  timestamps: true
});

export default mongoose.model('Movie', movieSchema);