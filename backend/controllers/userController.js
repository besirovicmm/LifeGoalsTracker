const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/userModel')

// POST , Register USER, /api/users , PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please all add fields')
  }
  //Proveri da li korisnik postoji

  res.json({ message: 'Reg user' })
})
// POST , Auth USER, /api/users/login , PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Login user' })
})
// GET , Get USER data, /api/users/me , PUBLIC
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: ' user data display' })
})

module.exports = { registerUser, loginUser, getMe }
