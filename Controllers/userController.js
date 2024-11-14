const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')


exports.userRegister = async (req, res) => {
    try {
        const { email, username, password } = req.body
        if (!email || !username || !password) {
            res.status(406).json("Invalid Data!!")
        }
        else {
            const newUser = new users({ email, username, password, github: "", linkedin: "", profile: "" })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.userLogin = async (req, res) => {
    // console.log(req.body)
    try {
        const { email, password } = req.body
        const exsisting = await users.findOne({ email, password })
        if (exsisting) {
            const token = jwt.sign({ userID: exsisting._id }, process.env.SECRET_KEY)
            res.status(200).json({ token, username: exsisting.username, github: exsisting.github, linkedin: exsisting.linkedin, profile: exsisting.profile })
        }
        else {
            res.status(406).json("invalid Email/Password")
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.userUpdation = async (req, res) => {
    try {
        const userId = req.payload
        if (req.file) {
            var profile = req.file.filename
            var { username, github, linkedin } = req.body
        }
        else {
            var { username, github, linkedin, profile } = req.body
        }
        const result = await users.findByIdAndUpdate(userId, { username, github, linkedin, profile })
        res.status(200).json("Updated")
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}
