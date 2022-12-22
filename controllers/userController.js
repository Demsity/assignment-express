const express = require('express')
const bCrypt = require('bcrypt')
const { default: mongoose } = require('mongoose')
const controller = express.Router()
const userSchema = require('../schemas/userSchema')
const { generateAccesTolken, authorize } = require('../middleware/auth')

module.exports = controller

controller.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bCrypt.hash(req.body.password, 10)

        const userConflict = await userSchema.findOne({email: req.body.email})

        if (userConflict) {
            res.status(409).json()
            console.log('conflict')

        } else {
            const user = await userSchema.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            console.log(user)
            res.status(201).json(user)
        }


    } catch {
        res.status(500).json()
    }
})

controller.post('/login', async (req, res) => {
    if (req !== undefined) {
        const user = await userSchema.findOne({email: req.body.email})

        if (user !== undefined) {
            try {
                if (await bCrypt.compare(req.body.password, user.password)){
                    console.log('logged in')
                    res.status(200).json({
                        accesToken: generateAccesTolken(user._id)
                    })
                } else {
                    console.log('wrong password')
                    res.status(400).json()
                }
            } catch {
                res.status(500)
                console.log('error')
            }

        } else {
            res.status(404)
        }

    } else {
        res.status(500)
    }
})

controller.get('/', async (req, res) => {
    try {
        const changedUsers = []
        const users = await userSchema.find()
        // Make password blank to not send it to Front End
        for (let user of users) {
            user.password = ''
            changedUsers.push(user)
        }
        res.status(200).json(changedUsers)
    } catch {
        res.status(404).json()
    }
})

//Delete a user
controller.delete('/:id', authorize, async (req, res) => {
    try {
        await userSchema.findByIdAndDelete(req.params.id)
        res.status(200)
    }catch {
        res.status(404)
    }

})