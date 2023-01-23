const express = require('express')
const router = express.Router()
const UserGames = require('../models/userPreference')
const fetchuser = require('../middleware/fetchuser')

//Route1 Add A Game To Users List 'api/games/removeusergame [LOGIN REQUIRED]
router.post('/addusergame', fetchuser, async (req, res) => {
    try {
        const user = await UserGames.findOne({user: req.user.id})

        if(!user){
            await UserGames.create({user: req.user.id, games: []})
        }
        
        const { gamePref } = req.body
        var savedList = null
        console.log(gamePref);
        UserGames.findOne({ user: req.user.id }, async (err, list) => {
            for (let i = 0; i <= list.games.length; i++) {
                if (list.games[i] == gamePref) {
                    return res.status(400).json({ msg: "Game Already Added", type: "Error" })
                }
            }
            list.games.push(...gamePref)
            savedList = await list.save()
            res.json({ list: savedList.games })
        })
    }
    catch (e) {
        return res.status(500).json({ msg: "Some Internal Error Occured" })
    }
})

//Route2 Remove Game From Users List 'api/games/removeusergame [LOGIN REQUIRED]
router.post('/removeusergame', fetchuser, async (req, res) => {
    try {
        const { gamePref } = req.body
        UserGames.findOne({ user: req.user.id }, async (err, list) => {
            for (let i = 0; i < list.games.length; i++) {
                if (list.games[i] == gamePref) {
                    list.games.splice(i , 1)
                    let savedList = await list.save()
                    return res.json({ list: savedList.games })
                }
            }
            res.json({msg: "Could Not Find The Game In Your List"})
        })
    }
    catch (e) {
        return res.status(500).json({ msg: "Some Internal Error Occured" })
    }
})

module.exports = router