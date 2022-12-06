const mongoose = require('mongoose')

//suggested by Mongoose to run
mongoose.set('strictQuery', false)

const mongodb = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB running at ${connection.connection.host}`)
}

module.exports = mongodb