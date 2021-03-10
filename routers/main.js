const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Postagens')
const Produtos = mongoose.model("postagens")

router.get("/", (req, res) => {
  res.render('home')
})

router.get('/produtos', (req, res) => {
  Produtos.find().then((produtos) => {
    res.render('produtos', {posts: produtos})
  }).catch((err) => {
    req.flash("error_msg", "Não foi possível carregar as postagens")
    res.redirect('/')
  })
})

module.exports = router
