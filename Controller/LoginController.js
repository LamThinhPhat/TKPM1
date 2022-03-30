
class LoginController {
    //[GET] login page /login
    loginPage(req, res) {
        res.render('login/login');
    }

    //[GET] forget page /forget
    forgetPage(req, res) {
        res.render('login/forget' );
    }
}

module.exports = new LoginController;