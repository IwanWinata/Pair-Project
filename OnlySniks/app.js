const express = require('express')
const app = express()
const port = 3000
let controller = require("./controllers/controller")

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")

app.get('/', controller.home)
app.get('/login',controller.getlogin)
app.post('/login')
app.get('/register', controller.register)
app.post('/register')
app.get('/Category')
app.post('/Category')
app.get('/product/add')
app.get('/product/add')
app.get('/product/edit/:id')
app.get('/product/edit/:id')
app.get('/')
app.get('/')
app.get('/')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})