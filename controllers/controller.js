const {Product, Category, User, UserProfile, Order} = require("../models")
const {currency} = require("../helpers/helepr")
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const qrcode = require("qrcode")

class Controller {

    static home(req, res){
        let category;
        const userId = req.session.UserId
        const role = req.session.role

        const {search} = req.query
        const option = {
            include:Category
        }
        if(search){
            option.where={
                CategoryId: search
            }
        }
        console.log(option);
        Category.findAll()
        .then(data => {
            category = data
            return Product.findAll(option)
        })
        .then(data => {
            res.render("home", {data, category, currency ,userId ,role})
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    } 

    static getlogin(req, res){
        res.render("modallogin")
    }

    static postlogin(req,res){
        const { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if (isValidPassword) {
                        req.session.UserId = user.id
                        req.session.role = user.role
                        res.redirect(`/`)
                    } 
                    else {
                        const error = "Invalid Input Password"
                        return res.redirect(`/?error=${error}`)
                    }
                } else {
                    const error = "Invalid Input Email"
                    return res.redirect(`/?error=${error}`)
                }
            })
            .catch(err => res.send(err))
    }

    static register(req, res){
        res.render("register")
    }

    static saveregister(req, res){
        let {firstName, lastName, phoneNumber, address, email, password} = req.body
        User.create({email, password})
        .then(({id}) => {
            return UserProfile.create({firstName, lastName, phoneNumber, address, email, password, UserId: id})
        })
        .then(() => {
            res.redirect("/")
        })
        .catch(err => {
            res.send(err)
        })
    }

    static logout(req,res){
        req.session.destroy((err) => {
            if (err) {
                return next(err)
            }else{
                res.clearCookie('connect.sid',{ path: '/' })
                return res.redirect("/")
            }
        })
    }

    static orderadmin(req,res){
        Order.findAll({ include: { all: true, nested: true }})
        .then((dataorder)=>{
            res.render('orderAdmin',{dataorder})
        })
        .catch((err)=>{
            res.send(err)
        })
    }

    static formproduct(req, res){
        let errors = req.query.error
        Category.findAll()
        .then(data => {
            res.render("formproduct", {data, errors})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static saveproduct(req, res){
        let {name, price, image, description, CategoryId} = req.body
        Product.create({name, price, image, description, CategoryId})
        .then(() => {
            res.redirect(`/`)
        })
        .catch(err => {
            if(err.name = "SequelizeValidationError"){
                let errors = err.errors.map(el => el.message)
                res.redirect(`/product/add?error=${errors.join("\n")}`)
            }else{
                res.send(err)
            }
            
        })
    }

    static checkout(req, res){
        const userId = req.session.UserId
        User.findAll({
            include: UserProfile,
            where: {id: userId}
        })
        .then((data) => {
            return Order.create({
                shippingAddress: data[0].UserProfile.address,
                UserId: userId,
                ProductId: +req.params.id
            })
        })
        .then(() => {
            res.redirect(`/?succes=Succes make your order`)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

    static userorder(req, res){
        const userId = req.session.UserId
        Order.findAll({
            include: Product,
            where: {UserId: userId}    
        })
        .then(data => {
            res.render("userorder", {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static cancel(req ,res){
        const userId = req.session.UserId
        Order.destroy({
            where: {id: +req.params.id}    
        })
        .then(() => {
            res.redirect("/user/order")
        })
        .catch(err => {
            res.send(err)
        })
    }

    static confirm(req, res){
        Order.findByPk(+req.params.id)
        .then(({status}) => {
            return Order.update(
                {status: true},
                {where: {id: +req.params.id}}
            )
        })
        .then( () => {
            res.redirect("/order/admin")
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

    static detail(req, res){
        Order.findByPk(+req.params.id)
        .then(({orderNumber}) =>{
            return qrcode.toDataURL(`${orderNumber}`)  
        })
        .then((qr_code) => {
            res.render("detail", {qr_code})
        })
        .catch(err => {
            res.send(err)
        })
    }
}
module.exports = Controller