const {Product, Category} = require("../models")
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
}
module.exports = Controller