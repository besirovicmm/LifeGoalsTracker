const asyncHandler = require('express-async-handler')

//@desc Get Goals
//@route GET /api/Goals
//access PRIVATE
const getCiljeve = asyncHandler(async (req, res) => {
  res.status(200)
  res.json({ mesage: 'Get ciljeve' })
})

//@desc set Goals
//@route SET /api/Goals
//access PRIVATE
const setCiljeve = asyncHandler(async (req, res) => {
  //   if (!req.body.text) {
  //     res.status(400).json({ mesage: 'please add a text field' })
  //   }
  console.log(req.body)
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  } else {
    res.status(200).json({ mesage: 'Set ciljeve' })
  }
})
//@desc update Goals
//@route PUT /api/Goals
//access PRIVATE
const updateCiljeve = asyncHandler(async (req, res) => {
  res.status(200)
  res.json({ mesage: `Update cilj ${req.params.id}` })
})
//@desc DELETE Goals
//@route DELETE /api/Goals
//access PRIVATE
const deleteCiljeve = asyncHandler(async (req, res) => {
  res.status(200)
  res.json({ mesage: `DELETE cilj ${req.params.id}` })
})

module.exports = {
  getCiljeve,
  setCiljeve,
  updateCiljeve,
  deleteCiljeve,
}
