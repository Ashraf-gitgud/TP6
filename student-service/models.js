const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    _id: String,
    nom: {type:String,required:true},
    email: {type:String,unique:true},
    cours: [{type:String,ref:'Cours'}]
  })

module.exports = mongoose.model('Student',StudentSchema)