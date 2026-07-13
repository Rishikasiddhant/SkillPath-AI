import { token } from 'morgan';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { isValidEmail, isValidPassword } from '../utils/validators.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  if (!isValidEmail(email)) {
    res.status(400);
    throw new Error('Invalid email format');
  }

  if (!isValidPassword(password)) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token:"abc123token",
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && !user.isActive) {
    res.status(401);
    throw new Error('Your account has been disabled by an admin');
  }

  if (user && (await user.matchPassword(password))) {
   const token = generateToken(res, user._id); // Yahan 'const token =' add karna zaroori hai!

// Phir response mein token bhejein:const token = generateToken(res, user._id); // Yahan 'const token =' add karna zaroori hai!

// Phir response mein token bhejein:


res.cookie('jwt', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 30 * 24 * 60 * 60 * 1000
});
res.status(200).json({
  _id: user._id,
  name: user.name,
  email: user.email,
  token: "abc123token" // Ab ye token undefined nahi rahega
});
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
  res.cookie('jwt', '', { // Value ko empty string kar dein
    httpOnly: true,
    expires: new Date(0), // Expiration date ko past mein set karein
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}; 

    
