const express = require('express')
const router = express.Router()
const {
  getCiljeve,
  setCiljeve,
  updateCiljeve,
  deleteCiljeve,
} = require('../controllers/ciljeviController')

const protect = require('../middleware/authMiddleware')

// router.route('/').get(protect,getCiljeve).post(protect,setCiljeve)
// router.route('/:id').delete(protect,deleteCiljeve).put(protect,updateCiljeve)

router.get('/', protect, getCiljeve)
router.post('/', protect, setCiljeve)
router.put('/:id', protect, updateCiljeve)
router.delete('/:id', protect, deleteCiljeve)

module.exports = router
