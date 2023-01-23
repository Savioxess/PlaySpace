const express = require('express')
const { default: mongoose } = require('mongoose')
const fetchuser = require('../middleware/fetchuser')
const Posts = require('../models/postModel')
const router = express.Router()

//Route1 Get All Posts 'api/posts/fetchallposts' [LOGIN REQUIRED]
router.get('/fetchallposts', fetchuser, async (req, res) => {
    try {
        let postList = await Posts.find().sort({ date: 'desc'})
        let list = []

        for(let i = 0; i < postList.length; i++){
            list.push([postList[i]])

            for(let j = 0; j < postList[i].likedBy.length; j++){
                if(postList[i].likedBy[j] == req.user.id){
                    list[i].push(true)
                }
            }
        }

        res.json({ list })
    }
    catch (e) {
        return res.status(500).json({ msg: "Some Internal Error Occured", err: e })
    }
})

//Route2 Publish post 'api/posts/publishpost' [LOGIN REQUIRED]
router.post('/publishpost', fetchuser, async (req, res) => {
    try {
        const { author, body, game } = req.body
        let post = await Posts.create({
            user: req.user.id,
            author: author,
            body: body,
            game: game
        })

        let posts = await Posts.find()

        res.json({ posts })
    }
    catch (e) {
        return res.status(500).json({ error: "Some Internal Error Occured" })
    }
})

//Route3 Like A Post 'api/posts/likepost' [LOGIN REQUIRED]
router.put('/likepost', fetchuser, async (req, res) => {
    try {
        const { postId } = req.body
        const userId = req.user.id

        Posts.findById(postId, async (err, post) => {
            for (let i = 0; i <= post.likedBy.length; i++) {
                if (post.likedBy[i] == userId) {
                    let dislikedPost = await Posts.findByIdAndUpdate(postId, { $inc: { 'likes': -1 }, $pull: { 'likedBy': userId } }, { new: true })
                    return res.json({ dislikedPost })
                    break;
                }
            }

            let likedPost = await Posts.findByIdAndUpdate(postId, { $inc: { 'likes': 1 }, $addToSet: { 'likedBy': userId } }, { new: true })
            res.json({ likedPost })
        })
    }
    catch {
        return res.json("INternal eorror")
    }
})

module.exports = router