const express = require('express')
const bCrypt = require('bcrypt')
const controller = express.Router()
let users = require('../data/simulated_database_users')

module.exports = controller

controller.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bCrypt.hash(req.body.password, 10)

        if (users.find(user => user.email !== req.body.email)) {
            const user = {
                id: (users[users.length -1])?.id > 0 ? (users[users.length -1])?.id +1 : 1,
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
            users.push(user)
            res.status(201).json(user)
        } else {
            res.status(409)
        }


    } catch {
        res.status(500).json()
    }
})

controller.post('/login', async (req, res) => {
    if (req !== undefined) {
        const user = users.find(user => user.email === req.body.email)

        if (user !== undefined) {
            try {
                if (await bCrypt.compare(req.body.password, user.password)){
                    console.log('logged in')
                    res.status(200).json()
                } else {
                    console.log('wrong password')
                    res.status(400).json()
                }
            } catch {
                res.status(500)
            }

        } else {
            res.status(404)
        }

    } else {
        res.status(500)
    }
})

controller.get('/', (req, res) => {
    if (req !== undefined) {
        res.status(200).json(users)
    } else {
        res.status(404).json()
    }
})