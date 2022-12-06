require('dotenv').config()

const port = process.env.API_PORT || 6000
const express = require('express')
const mongodb = require('./server-MongoDB')
const cors = require('cors')
const bodeParser = require('body-parser')
const app = express()


//  Middleware
app.use(cors())
app.use(bodeParser.json())

// Routes
const formController = require('./controllers/formController')
app.use('/api', formController)

const userController = require('./controllers/userController')
app.use('/api/users', userController)

const productController = require('./controllers/productController')
app.use('/api/products', productController)




// Init
mongodb()
app.listen(port)
console.log(`API running on port http://localhost:${port}`)
