const express = require('express')
const router = express.Router()
const {
  getCiljeve,
  setCiljeve,
  updateCiljeve,
  deleteCiljeve,
} = require('../controllers/ciljeviController')

router.route('/').get(getCiljeve).post(setCiljeve)
router.route('/').delete(deleteCiljeve).put(updateCiljeve)

// router.get('/', getCiljeve)
// router.post('/', setCiljeve)
// router.put('/:id', updateCiljeve)
// router.delete('/:id', deleteCiljeve)

module.exports = router
