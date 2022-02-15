const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Molim vas dodajte ime'],
    },
    email: {
      type: String,
      required: [true, 'Molim vas dodajte email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Molim vas dodajte password'],
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model('User', userSchema)
