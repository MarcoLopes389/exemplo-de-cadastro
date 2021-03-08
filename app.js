const express = require("express")
const app = express()
const main = require("./routers/main")
const handlebars = require("express-handlebars")

//Definição da view engine
const hbs = handlebars.create({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//Divisão de rotas
app.use('/', main)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Servidor rodando")
})
