const {Product, Category, User, UserProfile} = require("../models")
const {currency} = require("../helpers/helepr")
class Controller {

    static home(req, res){
        let category;
        Category.findAll()
        .then(data => {
            category = data
            return Product.findAll({
                include: Category
            })
        })
        .then(data => {
            res.render("home", {data, category, currency})
        })
        .catch(err => {
            res.send(err)
        })
    } 

    static getlogin(req, res){
        res.render("modallogin")
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
}
module.exports = Controller