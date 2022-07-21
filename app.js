const express = require('express')
const app = express()
const port = 3000
let controller = require("./controllers/controller")
const session = require('express-session')

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")

app.use(session({
  secret: 'Secret ',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
 }
}))

app.get('/', controller.home)
app.get('/login',controller.getlogin)
app.post('/login',controller.postlogin)
app.get('/register', controller.register)
app.post('/register', controller.saveregister)
app.get('/logout',controller.logout)
app.use((req, res, next) => {
  console.log(req.session.role)
  const error = "Invalid"
  if(!req.session.UserId){
    res.redirect(`/?error=${error}`)    
  }else{
    next()
  }
})

app.get('/Category')
app.post('/Category')
app.get('/product/add')
app.get('/product/add')
app.get('/order/admin',controller.orderadmin)
app.get('/product/edit/:id')
app.get('/product/edit/:id')
app.get('/')
app.get('/')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})