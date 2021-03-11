const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Postagens')
require('../models/Usuarios')
const Produtos = mongoose.model("postagens")
const Usuarios = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require('passport')

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

router.get('/cadastro', (req, res) => {
  res.render('cadastro')
})

router.post('/cadastro', (req, res) => {
  bcrypt.genSalt(10, (erro, salt) => {
    bcrypt.hash(req.body.senha, salt, (erro, hash) => {
      if(erro){
        req.flash("error_msg", "Houve um erro ao salvar o usuário")
        res.redirect('/')
      }
      new Usuarios({
        nome: req.body.nome,
        email: req.body.email,
        senha: hash
      }).save().then(() => {
        req.flash("success_msg", "Usuário cadastrado com sucesso")
        res.redirect("/")
      }).catch((err) => {
        req.flash("error_msg", "Erro ao criar o usuário")
        res.redirect("/")
      })
    })
  })
})

router.get('/entrar', (req, res) => {
  res.render('login')
})

router.post('/entrar', (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/entrar",
    failureFlash: true
  })(req, res, next)
})

router.get('/sair', (req, res) => {
  req.logout()
  req.flash("success_msg", "Você saiu")
  res.redirect('/')
})

router.get('/perfil', (req, res) => {
  res.render('perfil')
})

router.get('/users/edit', (req, res) => {
  res.render('editperfil')
})

router.post('/users/edit', (req, res) => {
  Usuarios.findOne({_id: req.body.id}).then((usuario) => {
    usuario.nome = req.body.nome
    usuario.email = req.body.email

    bcrypt.genSalt(10, (erro, salt) => {
      bcrypt.hash(req.body.senha, salt, (erro, hash) => {
        if(erro){
          req.flash("error_msg", "Houve um erro ao editar o usuário")
          res.redirect('/')
        }
        usuario.senha = hash
        usuario.save().then(() => {
          req.flash("success_msg", "Usuário editado com sucesso")
          res.redirect('/')
        }).catch((err) => {
          req.flash("error_msg", "Não foi possível editar o usuário")
          res.redirect('/')
        })
      })
    })
  })
})

module.exports = router
