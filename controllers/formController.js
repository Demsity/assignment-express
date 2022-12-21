const express = require('express')
const { default: mongoose } = require('mongoose')
const controller = express.Router()
const commentSchema = require('../schemas/commentSchema')
const { authorize } = require('../middleware/auth')


// Not used anymore, leaving them in for review

// Create Product
controller.post('/', async (req, res) => {
    const {name, email, comments} = req.body
    console.log(req.body)
    

    if (!name || !email || !comments) {
        res.status(400).json()
        
    } 
   try {
        const comment = await commentSchema.create({
            name: name,
            email: email, 
            comment: comments
        })
        if (comment) {
            res.status(201).json()

        }
    } catch {
    res.status(400).json()

    }
    
})

// Get a single comment
controller.get('/:id', async (req, res) => {
    try {
        const comment = commentSchema.findById(req.body._id)
        res.status(200).json(comment)
    } catch {
        res.status(404).json()
    }
})


// Get x Number or All
controller.get(`/`, async (req, res) => {
    try {
        const comments = await commentSchema.find()
        res.status(200).json(comments)
    } catch {
        res.status(404).json()
    }
}) 

//Delete a comment
controller.delete('/:id', authorize, async (req, res) => {
    try {
        await commentSchema.findByIdAndDelete(req.params.id)
        res.status(200)
    }catch {
        res.status(404)
    }

})

module.exports = controller