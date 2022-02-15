const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/userModel')

// POST , Register USER, /api/users , PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Popunite sva polja ')
  }
  //Proveri da li korisnik postoji
  const userExists = await UserModel.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User vec postoji')
  }

  //Kriptuj password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Kreiraj korisnika u bazi

  const user = await UserModel.create({
    email,
    name,
    password: hashedPassword,
    token: generateToken(user._id),
  })

  if (user) {
    res.status(201)
    res.json({ _id: user.id, name: user.name, email: user.email })
  } else {
    res.status(400)
    throw new Error('Nije validno nesto')
  }
})
// POST , Auth USER, /api/users/login , PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //prover korisnika sa emailom
  const user = await UserModel.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Nije validno nesto')
  }
})
// GET , Get USER data, /api/users/me , PRIVATE
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await UserModel.findById(req.user.id)

  res.status(200)
  res.json({ id: _id, name, email })
})
//Napravi JWT Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}
module.exports = { registerUser, loginUser, getMe }
