const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const sign = user => jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-only-secret', { expiresIn: '7d' });
const safe = user => ({ id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar });
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: 'An account with this email already exists.' });
    const user = await User.create({ name: name.trim(), email, password: await bcrypt.hash(password, 12) });
    res.status(201).json({ token: sign(user), user: safe(user) });
  } catch (e) { next(e); }
});
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase() });
    if (!user || !await bcrypt.compare(req.body.password || '', user.password)) return res.status(401).json({ message: 'Email or password is incorrect.' });
    res.json({ token: sign(user), user: safe(user) });
  } catch (e) { next(e); }
});
router.get('/me', auth, (req, res) => res.json({ user: safe(req.user) }));
module.exports = router;
