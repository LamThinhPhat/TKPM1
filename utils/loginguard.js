function LoginGuard(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function LoginedGuard(req, res, next) {
    if (!req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = {
    LoginGuard,
    LoginedGuard
}

