import Review from '../models/Review.js';

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'username email')
      .populate('movie', 'title director')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'username email')
      .populate('movie', 'title director');
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review non trouvée' 
      });
    }
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    
    const populated = await Review.findById(review._id)
      .populate('user', 'username email')
      .populate('movie', 'title director');
      
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('user', 'username email')
      .populate('movie', 'title director');
      
    if (!review) return res.status(404).json({ 
      success: false, 
      message: 'Review not found' 
    });
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ 
      success: false,
      message: 'Review not found' 
    });
    res.json({ 
      success: true,
      message: 'Review deleted successfully', 
      data: review 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};