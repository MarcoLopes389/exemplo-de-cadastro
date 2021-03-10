const express = require('express')
const router = express.Router()
require('../models/Postagens')
const mongoose = require('mongoose')
const Postagens = mongoose.model("postagens")

router.get('/', (req, res) => {
  Postagens.find().then((posts) => {
    res.render("admin/index", {posts: posts})
  })
})

router.get('/novo', (req, res) => {
  res.render("admin/novoproduto")
})

router.post('/novo', (req, res) => {
  new Postagens({
    titulo: req.body.titulo,
    descricao: req.body.descricao
  }).save().then(() => {
    req.flash("success_msg", "Postagem criada com sucesso")
    res.redirect('/admin')
  }).catch((err) => {
    req.flash("error_msg", "Não foi possível criar a postagem")
  })
})

router.post('/delete', (req, res) => {
  Postagens.deleteOne({_id: req.body.id}).then(() => {
    req.flash("success_msg", "Postagem deletada com sucesso")
    res.redirect("/admin")
  }).catch((err) => {
    req.flash("error_msg", "Não foi possível deletar a postagem")
    res.redirect("/admin")
  })
})

module.exports = router
