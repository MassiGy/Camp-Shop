module.exports.renderLoginForm = (req, res) => {
    res.render('login.ejs')
}


module.exports.postLogin = async(req, res) => {
    res.send('Login post : need to be built!')
}