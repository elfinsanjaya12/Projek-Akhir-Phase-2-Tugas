const checkAuth = (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
        res.redirect('/users/login')
    } else {
        next()
    }
}

module.exports = {
    checkAuth
}