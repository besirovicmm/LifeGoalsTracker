const express = require('express')

const dotenv = require('dotenv').config()
const port = process.env.PORT

const connectDB = require('./config/db')

const app = express()

const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const ciljeviRute = require('./routes/ciljeviRute')
const userRoutes = require('./routes/userRoutes')

app.use('/api/ciljevi', ciljeviRute)
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`server radi na ${port} port`)
})
