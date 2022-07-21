const {Product, Category, User, UserProfile, Order} = require("../models")
const {currency} = require("../helpers/helepr")
const bcrypt = require('bcrypt');
class Controller {

    static home(req, res){
        let category;
        const userId = req.session.UserId
        const role = req.session.role
        Category.findAll()
        .then(data => {
            category = data
            return Product.findAll({
                include: Category
            })
        })
        .then(data => {
            res.render("home", {data, category, currency ,userId ,role})
        })
        .catch(err => {
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
        console.log({firstName, lastName, phoneNumber, address, email, password});
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
                console.log(err)
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
            console.log(err);
            res.send(err)
        })
    }
}
module.exports = Controller