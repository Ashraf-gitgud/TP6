const express = require('express')
const mongoose = require('mongoose')
const teachers = require('./routes')
const app = express()
const verifyToken = require('../middleware/verifyToken')
app.use(express.json())
const cors = require('cors');
app.use(cors());


mongoose.connect('mongodb://localhost:27017/TP6')
    .then(() => console.log('Connected to TP6'))
    .catch(err => console.error(err))

app.use('/teacher-service', verifyToken, teachers)

const PORT = 3003
app.listen(PORT, () => console.log(`Teacher service PORT: ${PORT}`))