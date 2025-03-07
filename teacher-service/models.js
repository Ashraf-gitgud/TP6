const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    _id: String,
    name: {type:String,required:true},
    bio: String,
    cours: [{type:String,ref:'Course'}]
  })

module.exports = mongoose.model('Teacher',TeacherSchema)