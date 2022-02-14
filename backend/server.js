const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const app = express()
const { errorHandler } = require('./middleware/errorMiddleware')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const ciljeviRute = require('./routes/ciljeviRute')

app.use('/api/ciljevi', ciljeviRute)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`server radi na ${port} port`)
})
