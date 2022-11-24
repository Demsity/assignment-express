const port = process.env.PORT || 4000
const express = require('express')
const cors = require('cors')
const bodeParser = require('body-parser')
const app = express()


//  Middleware
app.use(cors())
app.use(bodeParser.json())

const formController = require('./controllers/formController')
app.use('/api', formController)

const productController = require('./controllers/productController')
app.use('/api/products', productController)



app.listen(port)
