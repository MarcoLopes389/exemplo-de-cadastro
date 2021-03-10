const express = require("express")
const app = express()
const main = require("./routers/main")
const admin = require("./routers/admin")
const handlebars = require("express-handlebars")
const path = require('path')
const flash = require("connect-flash")
const session = require("express-session")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
require('./config/auth')(passport)

//Definição da view engine
const hbs = handlebars.create({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
})

app.use(session({
  secret: "xzkl2h41f",
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  res.locals.user = req.user || null
  next()
})

//Handlebars engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//banco de dados mongodb
mongoose.connect("mongodb://localhost/exemplo", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("conectado")
}).catch((err) => {
  console.log("Houve um erro:", err)
})

//Body parser
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

//Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

//Divisão de rotas
app.use('/', main)
app.use('/admin', admin)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Servidor rodando")
})
