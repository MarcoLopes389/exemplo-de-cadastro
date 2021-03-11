const express = require('express')
const router = express.Router()
require('../models/Postagens')
require('../models/Usuarios')
const mongoose = require('mongoose')
const Postagens = mongoose.model("postagens")
const Usuarios = mongoose.model("usuarios")
const {eAdmin} = require('../helpers/eadmin')

router.get('/', eAdmin, (req, res) => {
  Postagens.find().then((posts) => {
    res.render("admin/index", {posts: posts})
  })
})

router.get('/novo', eAdmin, (req, res) => {
  res.render("admin/novoproduto")
})

router.get('/post/edit/:id', eAdmin, (req, res) => {
  Postagens.findOne({_id: req.params.id}).then((post) => {
    res.render('editpost', {post: post})
  })
})

router.post('/post/edit/:id', eAdmin, (req, res) => {
  Postagens.findOne({_id: req.params.id}).then((post) => {
    post.titulo = req.body.titulo
    post.descricao = req.body.descricao

    post.save().then(() => {
      req.flash("success_msg", "Postagem editada com sucesso")
      res.redirect('/admin')
    }).catch((err) => {
      req.flash("error_msg", "Não foi possível editar a postagem")
    })
  })
})

router.post('/novo', eAdmin, (req, res) => {
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

router.post('/delete', eAdmin, (req, res) => {
  Postagens.deleteOne({_id: req.body.id}).then(() => {
    req.flash("success_msg", "Postagem deletada com sucesso")
    res.redirect("/admin")
  }).catch((err) => {
    req.flash("error_msg", "Não foi possível deletar a postagem")
    res.redirect("/admin")
  })
})

router.get('/usuarios', eAdmin, (req, res) => {
  Usuarios.find().then((usuarios) => {
    res.render('admin/users', {users: usuarios})
  })
})

router.post('/users/tornar-adm', eAdmin, (req, res) => {
  Usuarios.findOne({_id: req.body.id}).then((usuario) => {
    usuario.eAdmin = 1
    usuario.save().then(() => {
      req.flash("success_msg", "Tornou-se admin")
      res.redirect('/admin')
    }).catch((err) => {
      req.flash("error_msg", "Não foi possível tornar admin")
      res.redirect('/admin')
    })
  })
})

router.post('/users/excluir', eAdmin, (req, res) => {
  Usuarios.deleteOne({_id: req.body.id}).then(() => {
    req.flash("success_msg", "Usuário excluído com sucesso")
    res.redirect('/admin/usuarios')
  })
})

module.exports = router
