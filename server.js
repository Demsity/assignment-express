const port = process.env.PORT || 4000
const express = require('express')
const cors = require('cors')
const app = express()


//  Middleware
app.use(cors())

const productController = require('./controllers/productController')
app.use('/api/products', productController)

app.listen(port)
