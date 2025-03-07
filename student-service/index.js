const express = require('express')
const mongoose = require('mongoose')
const students = require('./routes')
const app = express()
const verifyToken = require('../middleware/verifyToken')
app.use(express.json())
const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://localhost:27017/TP6')
    .then(() => console.log('Connected to TP6'))
    .catch(err => console.error(err))

app.use('/student-service', verifyToken, students)

const PORT = 3002
app.listen(PORT, () => console.log(`Students service PORT: ${PORT}`))