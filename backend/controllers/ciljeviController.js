const asyncHandler = require('express-async-handler')
const CiljModel = require('../models/ciljeviModel')
const UserModel = require('../models/userModel')

//@desc Get Goals
//@route GET /api/Goals
//access PRIVATE
const getCiljeve = asyncHandler(async (req, res) => {
  const ciljevi = await CiljModel.find({ user: req.user.id })

  res.status(200)
  res.json(ciljevi)
})

//@desc set Goals
//@route SET /api/Goals
//access PRIVATE
const setCiljeve = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const cilj = await CiljModel.create({
    text: req.body.text,
    user: req.user.id,
  })
  res.status(200).json(cilj)
})
//@desc update Goals
//@route PUT /api/Goals
//access PRIVATE
const updateCiljeve = asyncHandler(async (req, res) => {
  const cilj = await CiljModel.findById(req.params.id)

  if (!cilj) {
    res.status(400)
    throw new Error('No cilj')
  }

  const user = await UserModel.findById(req.user.id)

  //Proveri ima li korisnika
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Samo autor cilja menja cilj
  if (cilj.user.toString() !== user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const updatedGoal = await CiljModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(200).json(updatedGoal)
})
//@desc DELETE Goals
//@route DELETE /api/Goals
//access PRIVATE
const deleteCiljeve = asyncHandler(async (req, res) => {
  const cilj = await CiljModel.findById(req.params.id)

  if (!cilj) {
    res.status(400)
    throw new Error('No cilj')
  }
  const user = await UserModel.findById(req.user.id)

  //Proveri ima li korisnika
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Samo autor cilja menja cilj
  if (cilj.user.toString() !== user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }
  await cilj.remove()

  res.status(200)
  res.json({ id: req.params.id })
})

module.exports = {
  getCiljeve,
  setCiljeve,
  updateCiljeve,
  deleteCiljeve,
}
