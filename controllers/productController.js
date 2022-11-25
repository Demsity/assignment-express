const express = require('express')
const controller = express.Router()
let products = require('../data/simulated_database_products')

module.exports = controller

controller.param("id", (req, res, next, articleNumber) => {
    req.product = products.find(product => product.articleNumber == articleNumber)
    next()
})


controller.post('/', (req, res) => {
    let item = {
        articleNumber: (products[products.length -1])?.articleNumber > 0 ? (products[products.length -1])?.articleNumber +1 : 1,
        name: req.body.name, 
        price: req.body.price, 
        rating: req.body.rating,
        description: req.body.description, 
        category: req.body.category,
        imageName: req.body.imageName
    }

    products.push(item)
    console.log(item)
    res.status(201).json(item)
})


// Get a single product
controller.get('/:id', (req, res) => {

    if (req != undefined){
        res.status(200).json(req.product)
    }else {
        res.status(404).json()
    }
})

controller.put('/:id', (req, res) => {

    if (req != undefined){
        console.log(req.body.updatedProduct.articleNumber)
        products.forEach(product => {
            // console.log(product)
            if (product.articleNumber == req.body.updatedProduct.articleNumber) {
                product.name = req.body.updatedProduct.name ? req.body.updatedProduct.name : product.name
                product.description = req.body.updatedProduct.description ? req.body.updatedProduct.description : product.description
                product.category = req.body.updatedProduct.category ? req.body.updatedProduct.category : product.category
                product.imageName = req.body.updatedProduct.imageName ? req.body.updatedProduct.imageName : product.imageName
                product.price = req.body.updatedProduct.price ? req.body.updatedProduct.price : product.price
                product.rating = req.body.updatedProduct.rating ? req.body.updatedProduct.rating : product.rating
            }
        })                 
        res.status(200).json()
    }else
        res.status(406).json()
})


// Get x Number or All
controller.get(`/`, (req, res) => {
    let take = req.query.take
    if (req.query.take !== undefined){
        res.status(200).json(products.slice(0, take))
    }else {
        res.status(200).json(products)
    }
}) 







