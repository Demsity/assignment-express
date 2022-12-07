const express = require('express')
const { default: mongoose } = require('mongoose')
const controller = express.Router()
const commentSchema = require('../schemas/commentSchema')


// Create Product
controller.post('/', async (req, res) => {
    const {name, email, comments} = req.body
    console.log(req.body)
    

    if (!name || !email || !comments) {
        res.status(400).json()
    } 
   try {
        const comment = await commentSchema.create({
            name, 
            email, 
            comment
        })
        if (comment) {
            res.status(201).json()
            console.log(comment)

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
        const comments = commentSchema.find()
        res.status(200).json(comments)
        console.log(comments)
    } catch {
        res.status(404).json()
    }
}) 

module.exports = controller