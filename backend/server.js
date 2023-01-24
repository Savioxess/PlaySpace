require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const gameRouter = require('./routes/userGames')
const cors = require('cors')
const bodyParser = require('body-parser')
const postRouter = require('./routes/posts')
const app = express()

app.use(cors())
const URI = process.env.MONGO_URI

mongoose.connect(URI, (err) => {
    if (err) return console.error("Error Connecting To MongoDB");

    console.log("Successfully Connected To MongoDB");
})

app.use(express.json({limit: '100mb'}))
//app.use(bodyParser.json({limit: '100mb'}))
app.use(express.urlencoded({limit: '100mb',extended: false}))

//Routes
app.use('/api/auth', authRouter)
app.use('/api/games', gameRouter)
app.use('/api/posts', postRouter)

app.get('/*', (req, res) => {
    res.send("Hello World")
})

app.listen(3000, (err) => {
    if (err) console.error("Error Occured");

    console.log("Server Running At Port 3000")
})
