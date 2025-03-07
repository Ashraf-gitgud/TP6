const mongoose = require('mongoose')

const CoursSchema = new mongoose.Schema({
    _id: String,
    titre: String,
    professeur_id: {type:String,unique:true,ref:'Teacher'},
    description: String,
    prix: Number
  })

module.exports = mongoose.model('Cours',CoursSchema)