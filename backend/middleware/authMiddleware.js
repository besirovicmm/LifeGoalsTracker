const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      //decode
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

      //ubaci ID u req.user da bi imali pristup tome u svim zasticenim rutama
      req.user = await UserModel.findById(decodedToken.id).select('-password')

      //pozovi sledeci middleware
      next()
    } catch (error) {
      console.log(error)
      res.status(401) //not authorized
      throw new Error('Not authoorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authoorized no token')
  }
})

module.exports = protect
