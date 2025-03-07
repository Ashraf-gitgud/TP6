const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes')
const app = express()
app.use(express.json())
const cors = require('cors');
app.use(cors());


mongoose.connect('mongodb://localhost:27017/TP6')
    .then(() => console.log('Connected to TP6'))
    .catch(err => console.error(err))

app.use('/auth-service', auth)

const PORT = 3000
app.listen(PORT, () => console.log(`Auth service PORT: ${PORT}`))