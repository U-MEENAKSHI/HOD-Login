const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Hod = require('../models/Hod');

// POST /api/hod/login - Day 1 Frame 1 API
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const hod = await Hod.findOne({ email });

    if (!hod) {
      return res.status(404).json({ message: 'HOD not found with that email.' });
    }


    // Validate password
    const isPasswordValid = await bcrypt.compare(password, hod.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Email/Password Credentials.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: hod._id, email: hod.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: hod._id,
        email: hod.email
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during authentication.' });
  }
});

// POST /api/hod/forgot-password - Day 1 Frame 2 Dummy API
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required to reset password.' });
    }
    
    // In a real scenario, this would send an email with a reset link/code
    res.status(200).json({ message: 'If that email exists, a password reset link has been sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error processing password reset.' });
  }
});

module.exports = router;
