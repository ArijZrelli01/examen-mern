import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utilisateur non trouvé' 
      });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, bio },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ 
      success: false, 
      message: 'User not found' 
    });
    res.json({ success: true, data: user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'Username or email already exists' 
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ 
      success: false,
      message: 'User not found' 
    });
    res.json({ 
      success: true,
      message: 'User deleted successfully', 
      data: user 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};