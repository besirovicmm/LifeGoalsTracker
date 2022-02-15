const mongoose = require('mongoose')

const ciljSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    boja: {
      type: Number,
      required: [false],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Cilj', ciljSchema)
