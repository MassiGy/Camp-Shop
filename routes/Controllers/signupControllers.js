module.exports.renderSignupForm = (req, res) => {
    res.render('signup.ejs')
}


module.exports.postSignup = async(req, res) => {
    res.send('Signup post : need to be built!')
}