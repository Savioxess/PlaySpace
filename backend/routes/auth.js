const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserGames = require('../models/userPreference')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

//Route 1: Used To Create A New User By Hitting The '/api/auth/createuser' endpoint [NO LOGIN REQUIRED]
router.post('/createuser', [
    body('name', 'Name Should Be Atleast 3 Characters').isLength({min: 3}),
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password Should Be Atleast 5 Charatcers').isLength({min: 5})
], async (req, res) => {
    const errorInRequestBody = validationResult(req)

    if(!errorInRequestBody.isEmpty()){
        return res.status(400).json({msg: "Please Enter Valid Credentials",type: "red", errors: errorInRequestBody.array()})
    }

    try{
        const { name, email, password } = req.body
        let user = await User.findOne({email: email})

        if(user) return res.status(400).json({msg: "User Already Exists", type: "red"})

        const salt = await bcrypt.genSalt(10)
        const securedPassword = await bcrypt.hash(password, salt)

        console.log("Secured Pass Created");
        user = await User.create({
            name: name,
            email: email,
            password: securedPassword
        })

        let data = {
            user: {
                id: user.id
            }
        }

        console.log("Created JWT Token");
        let jwtToken = jwt.sign(data, JWT_SECRET)

        res.json({msg: "Success", type: "green", authToken: jwtToken})
    }
    catch(e){
        return res.status(500).json({msg: "Some Internal Error Occured", err: e})
    }
})

//Route2 Authenticate The User Hitting '/api/auth/authenticateuser' Endpoint [NO LOGIN REQUIRED]
router.post('/authenticateuser', [
    body('email', 'Invalid Email').isEmail(),
    body('password').exists()
], async (req, res) => {
    const errorsInRequestBody = validationResult(req)

    if(!errorsInRequestBody.isEmpty()){
        return res.status(400).json({msg: "Invalid Credentials", type: "red"})
    }

    try{
        const { email, password } = req.body
        let user = await User.findOne({email: email})

        if(!user) return res.status(400).json({msg: "User Does Not Exist"})

        const passwordCompare = await bcrypt.compare(password, user.password)

        if(!passwordCompare) return res.status(400).json({msg: "Invalid Credentials", type: "red"})

        let data = {
            user: {
                id: user.id
            }
        }

        const jwtToken = jwt.sign(data, JWT_SECRET)

        res.json({msg: "Success", tyep: "green", authToken: jwtToken})
    }
    catch(e){
        res.status(500).json({msg: "Some Internal Error Occured"})
    }
})

//Route3 To Get User's Basic Information Hit '/api/auth/getuser' [LOGIN REQUIRED]
router.get('/getuser', fetchuser, async (req, res) => {
    try{
        let user = await User.findById({_id: req.user.id}).select('-password')

        res.json({user})
    }
    catch(e){
        res.status(500).json({msg: "Some Internal Error Occured"})
    }
})

module.exports = router