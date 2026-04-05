const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User     = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ── Helper ─────────────────────────────────────────────────────────────────
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const userPayload = (user) => ({
  _id:          user.id,
  name:         user.name,
  email:        user.email,
  picture:      user.picture || null,
  currentLevel: user.currentLevel,
  authProvider: user.authProvider || 'local',
  token:        generateToken(user._id),
});

// ── @desc   Register a new user
// ── @route  POST /api/auth/register
// ── @access Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'Please provide name, email, and password.' });

    if (await User.findOne({ email }))
      return res.status(400).json({ error: 'An account with this email already exists.' });

    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    return user
      ? res.status(201).json(userPayload(user))
      : res.status(400).json({ error: 'Invalid user data.' });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Server error during registration.' });
  }
};

// ── @desc   Authenticate (login) a user
// ── @route  POST /api/auth/login
// ── @access Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

    // Prevent password login for Google-only accounts
    if (user.authProvider === 'google' && !user.password)
      return res.status(400).json({ error: 'This account uses Google Sign-In. Please use that instead.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

    res.json(userPayload(user));
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error during login.' });
  }
};

// ── @desc   Google OAuth Login / Register
// ── @route  POST /api/auth/google
// ── @access Public
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json({ error: 'Google token is required.' });

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken:  token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // ── Find or create user ───────────────────────────────────────────────
    let user = await User.findOne({ email });

    if (user) {
      // Existing user: update Google metadata if not already set
      if (!user.googleId) {
        user.googleId    = googleId;
        user.picture     = picture;
        user.authProvider = 'google';
        await user.save();
      }
    } else {
      // New user: create with a random strong password (they'll use Google to sign in)
      const randomPassword = require('crypto').randomBytes(32).toString('hex');
      const salt           = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = await User.create({
        name,
        email,
        password:     hashedPassword,
        googleId,
        picture,
        authProvider: 'google',
      });
    }

    res.json(userPayload(user));
  } catch (err) {
    console.error('Google login error:', err.message);

    if (err.message?.includes('Invalid token'))
      return res.status(401).json({ error: 'Google token is invalid or expired. Please try again.' });

    res.status(500).json({ error: 'Server error during Google authentication.' });
  }
};

module.exports = { register, login, googleLogin };
