const express = require('express')
const app = express()
const port = 3000
let controller = require("./controllers/controller")
const session = require('express-session')
const router = require("./routers/router")

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
app.use(router)


// app.get('/', controller.home)
// app.get('/login',controller.getlogin)
// app.post('/login',controller.postlogin)
// app.get('/register', controller.register)
// app.post('/register', controller.saveregister)
// app.get('/logout',controller.logout)
// app.use((req, res, next) => {
//   const error = "Invalid"
//   if(!req.session.UserId){
//     res.redirect(`/?error=${error}`)    
//   }else{
//     next()
//   }
// })

// app.get('/order/admin',controller.orderadmin)
// app.get('/product/add', controller.formproduct)
// app.post('/product/add', controller.saveproduct)
// app.get("/checkout/:id", controller.checkout)
// app.get("/user/order", controller.userorder)
// app.get("/user/cancel/:id", controller.cancel)
// app.get("/admin/confirm/:id", controller.confirm)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})