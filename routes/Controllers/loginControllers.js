const User = require("../../modals/user")
const { dataValidator, userValidator } = require("../../tools/validators")

module.exports.renderLoginForm = (req, res) => {
    res.render('login.ejs')
}


module.exports.postLogin = async(req, res) => {


}