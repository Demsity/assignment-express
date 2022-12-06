const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true},
    email: {type: String, required: true},
    comment: {type: String, required: true}
})


module.exports = mongoose.model('comments', commentSchema)