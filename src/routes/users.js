import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";

const router = express.Router()

// register
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    const user = await UserModel.findOne({ username })

    if(user) {
        throw new Error('User Already Exits!!') 
    }else {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await UserModel({ username, password: hashedPassword })
        await newUser.save()
    
        res.json({ message: "User created successfully" })
    }
})

// login 
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username })

    if(!user) return res.json({ message: "User doesn't exists" })

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
        return res.json({ message: "Username or Password is incorrect" })
    }

    const token = jwt.sign({ id: user._id }, "secret")

    res.json({ token, userId: user._id })
})


// get user 

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if(!user) return res.json({ message: 'user not found' });

    res.json({ username: user.username, id: user._id });
})

export { router as userRouter };