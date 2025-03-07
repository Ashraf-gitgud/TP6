const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models')
const router = express.Router()
const verifyToken = require('../middlewarre/verifyToken')

router.post('/register', async (req, res) => {
    const { email, name, _id , password } = req.body
    if (!email || !name || !_id || !password) {
      return res.status(400).json({ message: "Please verify your input fields" })
    }
    const inst = await User.findOne({ email })
    if (inst){ 
        return res.status(400).json({ message: "This email is already used" })
    }
    const hpw = await bcrypt.hash(password, 10)
    const user = new User({ email, name , _id , password: hpw })
    await user.save()
    res.status(201).json({ message: "User created successfully" })
  })

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user){
        return res.status(400).json({ message: "User not found" })
        }
    const check = await bcrypt.compare(password, user.password)
    if (!check){
         return res.status(400).json({ message: "Invalid Credentials" })
        }
    const token = jwt.sign({ id: user._id }, 'secret')
    res.json({ token })
})

router.get('/profile', verifyToken, async (req, res) => {
    const userId = req.query.id
  
    try {
      const user = await User.findById(userId)
      if (!user) return res.status(404).json({ error: 'User not found' })
  
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  })
  