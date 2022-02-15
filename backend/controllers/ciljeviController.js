const asyncHandler = require('express-async-handler')
const Cilj = require('../models/ciljeviModel')

//@desc Get Goals
//@route GET /api/Goals
//access PRIVATE
const getCiljeve = asyncHandler(async (req, res) => {
  const ciljevi = await Cilj.find()

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
  const cilj = await Cilj.create({
    text: req.body.text,
  })
  res.status(200).json(cilj)
})
//@desc update Goals
//@route PUT /api/Goals
//access PRIVATE
const updateCiljeve = asyncHandler(async (req, res) => {
  const cilj = await Cilj.findById(req.params.id)

  if (!cilj) {
    res.status(400)
    throw new Error('No cilj')
  }

  const updatedGoal = await Cilj.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})
//@desc DELETE Goals
//@route DELETE /api/Goals
//access PRIVATE
const deleteCiljeve = asyncHandler(async (req, res) => {
  const cilj = await Cilj.findById(req.params.id)

  if (!cilj) {
    res.status(400)
    throw new Error('No cilj')
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
