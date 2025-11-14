import Watchlist from '../models/Watchlist.js';

export const getWatchlists = async (req, res) => {
  try {
    const watchlists = await Watchlist.find()
      .populate('user', 'username email')
      .populate('movie', 'title director')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: watchlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWatchlistById = async (req, res) => {
  try {
    const watchlist = await Watchlist.findById(req.params.id)
      .populate('user', 'username email')
      .populate('movie', 'title director genre');
    if (!watchlist) {
      return res.status(404).json({ 
        success: false, 
        message: 'Watchlist non trouvée' 
      });
    }
    res.json({ success: true, data: watchlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createWatchlist = async (req, res) => {
  try {
    const watchlist = new Watchlist(req.body);
    await watchlist.save();
    
    const populated = await Watchlist.findById(watchlist._id)
      .populate('user', 'username email')
      .populate('movie', 'title director');
      
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('user', 'username email')
      .populate('movie', 'title director');
      
    if (!watchlist) return res.status(404).json({ 
      success: false, 
      message: 'Watchlist not found' 
    });
    res.json({ success: true, data: watchlist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.findByIdAndDelete(req.params.id);
    if (!watchlist) return res.status(404).json({ 
      success: false,
      message: 'Watchlist not found' 
    });
    res.json({ 
      success: true,
      message: 'Watchlist deleted successfully', 
      data: watchlist 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkWatchlistItem = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    
    const watchlistItem = await Watchlist.findOne({
      user: userId,
      movie: movieId
    })
      .populate('user', 'username email')
      .populate('movie', 'title director');

    if (!watchlistItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Non trouvé' 
      });
    }

    res.json({ success: true, data: watchlistItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};