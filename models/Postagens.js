const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const Postagens = new Schema({
  titulo:{
    type: String,
    required: true
  },
  descricao:{
    type: String,
    required: true
  },
  data:{
    type: Date,
    required: true,
    default: Date.now()
  }
})

mongoose.model("postagens", Postagens)
