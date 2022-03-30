class UserController {
    //[GET] infomation page /user
    InformationPage(req, res) {
        res.render('user/information');
    }

    //[GET] order page /order
    OrderPage(req, res) {
        res.render('user/order' );
    }
}

module.exports = new UserController;