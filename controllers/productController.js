const express = require('express')
const { default: mongoose } = require('mongoose')
const controller = express.Router()
const productSchema = require('../schemas/productSchema')

//middleware


// unsecured routes ///////////////////////////////////////////////////////

// Get a single product
controller.get('/:id', async (req, res) => {
        const item = await productSchema.findById(req.params.id)
        if (item) {
                const product = {
                    articleNumber: item._id.toString(),
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    rating: item.rating,
                    tag: item.tag,
                    category: item.category,
                    imageName: item.imageName
                }

                res.status(200).json(product) 

        } else {
            res.status(404)
        }

})

// Get x Number or All
controller.get(`/`, async (req, res) => {
    let take = req.query.take
    try {
        const listFromDB = await productSchema.find()
        const products = []
        if (listFromDB) {
            for(let product of listFromDB) {
                products.push({
                    articleNumber: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    rating: product.rating,
                    tag: product.tag,
                    category: product.category,
                    imageName: product.imageName
                })
            }
            if (req.query.take !== undefined){
                res.status(200).json(products.slice(0, take))
            }else {
                res.status(200).json(products)
            }
        } else {
            res.status(404)
        }

    } catch {
        res.status(400).json()
    }

}) 

// Get products/product by tag
controller.get(`/get/:tag`, async (req, res) => {
    let take = req.query.take

    try {
        const listFromDB = await productSchema.find({tag: req.params.tag})
        const products = []
        if (listFromDB) {
            for(let product of listFromDB) {
                products.push({
                    articleNumber: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    rating: product.rating,
                    tag: product.tag,
                    category: product.category,
                    imageName: product.imageName
                })
            }
            if (req.query.take !== undefined){
                res.status(200).json(products.slice(0, take))
            }else {
                res.status(200).json(products)
            }
        } else {
            res.status(404)
        }
    } catch {
        res.status(400).json()
    }


}) 
// Get products/product by price
controller.get(`/price/:price`, async (req, res) => {
    let take = req.query.take
    try {
        const listFromDB = await productSchema.find({price: req.params.price})
        const products = []
        if (listFromDB) {
            for(let product of listFromDB) {
                products.push({
                    articleNumber: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    rating: product.rating,
                    tag: product.tag,
                    category: product.category,
                    imageName: product.imageName
                })
            }
            if (req.query.take !== undefined){
                res.status(200).json(products.slice(0, take))
            }else {
                res.status(200).json(products)
            }
        } else {
            res.status(404)
        }
    } catch {
        res.status(400).json()
    }


}) 


// secured routes //////////////////////////////////////////////////////////////////

// Create Product
controller.post('/', async (req, res) => {
        const {name, price, description, rating, tag, imageName, category} = req.body
        

        if (!name || !price) {
            res.status(400).json()
        } 
        const itemConflict = await productSchema.findOne({name: name})
        if (itemConflict) {
            res.status(409).json()

        } else {
            const product = await productSchema.create({
                name, 
                description, 
                price,
                category,
                tag,
                imageName,
                rating
            })
            if (product) {
                res.status(201).json()
            }else {
                res.status(400).json()
            }
        }
})

// update a product
controller.put('/:id', async (req, res) => {

    const {name, price, description, rating, tag, imageName, category} = req.body
    
        try {
            const filter = req.body.articleNumber
            console.log(filter)
            await productSchema.findByIdAndUpdate({_id: filter}, {
                name: name,
                description: description, 
                price: price,
                category: category,
                tag: tag,
                imageName: imageName,
                rating: rating
            },{new: true})
            res.status(200)
        } catch {
            res.status(400)
        }


})

//Delete a product
controller.delete('/:id', async (req, res) => {
    try {
        await productSchema.findByIdAndDelete(req.params.id)
        res.status(200)
    }catch {
        res.status(404)
    }

})




module.exports = controller