const express = require('express');
const auth = require("../middleware/auth");
const app = express();
const userRouter = express.Router();


let User = require("../model/User");

userRouter.get("/user", auth, async(req, res) => {
    res.send(req.user)
})

userRouter.post("/user/logout", auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}) 


userRouter.post("/user", async (req, res) => {
    try {
        const user = User.create(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouter.post("/user/login", async (req, res) => {
    try {
        const { email, password} = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: "Login failed! Check authentication credentials!"})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch(error) {
        res.status(400).send(error)
    }
})

module.exports = userRouter