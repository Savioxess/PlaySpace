const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    game: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

const Post = mongoose.model('posts', PostSchema)

module.exports = Post