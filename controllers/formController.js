const express = require('express')
const controller = express.Router()
let comments = require('../data/simulated_database_comments')

module.exports = controller

controller.param("id", (req, res, next, id) => {
    req.comments = comments.find(comments => comments.id == id)
    next()
})

controller.post('/', (req, res) => {
   console.log(req.body.name)
   
    let comment = {
        id: (comments[comments.length -1])?.id > 0 ? (comments[comments.length -1])?.id +1 : 1,
        name: req.body.name,
        email: req.body.email,
        comments: req.body.comments,
        markedAsDone: false
    }

    comments.push(comment)
    console.log(comments)
    res.status(201).json()
})

// Get a single comment
controller.get('/admin/:id', (req, res) => {

    if (req != undefined){
        res.status(200).json(req.comments)
    }else {
        res.status(404).json()
    }
})


// Get x Number or All
controller.get(`/admin`, (req, res) => {
    let take = req.query.take
    if (req.query.take !== undefined){
        res.status(200).json(comments.slice(0, take))
    }else {
        res.status(200).json(comments)
    }
}) 