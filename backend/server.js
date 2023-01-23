require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const gameRouter = require('./routes/userGames')
const cors = require('cors')
const postRouter = require('./routes/posts')
const app = express()

const URI = process.env.MONGO_URI

mongoose.connect(URI, (err) => {
    if (err) return console.error("Error Connecting To MongoDB");

    console.log("Successfully Connected To MongoDB");
})

app.use(express.json())
app.use(cors())

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
