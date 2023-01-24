const express = require('express')
const { default: mongoose } = require('mongoose')
const fetchuser = require('../middleware/fetchuser')
const Posts = require('../models/postModel')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const multer = require('multer')

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage,
    fileFilter: (req, file, cb) => {
        var extension = path.extname(file.originalname);

        if(extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg' && extension !== '.svg' && extension !== '.gif'){
            return cb(new Error('Only Images Allowed'))
        }

        cb(null, true)
    }
}).single('postImage')

//Route1 Get All Posts 'api/posts/fetchallposts' [LOGIN REQUIRED]
router.get('/fetchallposts', fetchuser, async (req, res) => {
    try {
        let postList = await Posts.find().sort({ date: 'desc' })
        let list = []

        for (let i = 0; i < postList.length; i++) {
            list.push([postList[i]])

            for (let j = 0; j < postList[i].likedBy.length; j++) {
                if (postList[i].likedBy[j] == req.user.id) {
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
        upload(req, res, async (err) => {
            if (err) return res.status(400).json({ err: err, msg: "Some Error Occured", type: "red" });

            if (req.file) {
                const post = new Posts({
                    user: req.user.id,
                    author: req.body.author,
                    body: req.body.body,
                    image: {
                        name: req.body.name,
                        imageData: {
                            data: fs.readFileSync(path.join(__dirname, '../uploads/', req.file.filename)),
                            contentType: 'image/jpg'
                        }
                    },
                    game: req.body.game
                })

                post.save().catch(err => {return res.status(400).json({msg: "Error", type: "red"})})

                return res.json({msg: "success", type: "green"})
            }

            let post = await Posts.create({
                user: req.user.id,
                author: req.body.author,
                body: req.body.body,
                game: req.body.game
            })

            let posts = await Posts.find()

            res.json({ post })

        })
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
        return res.status(500).json("Internal error")
    }
})

//Route3 Get Users Posts [LOGIN REQUIRED]
router.get('/userposts', fetchuser, async(req, res) => {
    try{
        const userId = req.user.id

        let postList = await Posts.find({user: userId})

        let list = []

        for (let i = 0; i < postList.length; i++) {
            list.push([postList[i]])

            for (let j = 0; j < postList[i].likedBy.length; j++) {
                if (postList[i].likedBy[j] == req.user.id) {
                    list[i].push(true)
                }
            }
        }

        res.json({ list })
    }
    catch(e){
        return res.status(500).json("Internal error")
    }
})

//Route5 Delete Post WORKING

module.exports = router