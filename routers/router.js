const router = require("express").Router()
let controller = require("../controllers/controller")
const session = require('express-session')

router.get('/', controller.home)
router.get('/login',controller.getlogin)
router.post('/login',controller.postlogin)
router.get('/register', controller.register)
router.post('/register', controller.saveregister)
router.get('/logout',controller.logout)
router.use((req, res, next) => {
  const error = "Invalid"
  if(!req.session.UserId){
    res.redirect(`/?error=${error}`)    
  }else{
    next()
  }
})

router.get('/order/admin',controller.orderadmin)
router.get('/product/add', controller.formproduct)
router.post('/product/add', controller.saveproduct)
router.get("/checkout/:id", controller.checkout)
router.get("/user/order", controller.userorder)
router.get("/user/cancel/:id", controller.cancel)
router.get("/admin/confirm/:id", controller.confirm)
router.get("/user/detail/:id", controller.detail)

module.exports = router