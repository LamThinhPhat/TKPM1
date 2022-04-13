const userService = require('../services/userService.js');
const CircularJSON=require('circular-json');
const cartService = require('../services/cartService.js');

class UserController {
    //[GET] infomation page /user
    InformationPage(req, res) {
        res.render('user/information');
    }

    //[GET] order page /order
    OrderPage(req, res) {
        console.log(res.locals.user);
    }

    logOut(req, res) {
        req.logout();
        res.redirect('/');
    }
    async storeUpdateInformation(req, res) {
        const valid = await userService.updateInfo(req.params.id, req.body);
        if (valid) {
            const customer = await userService.getCustomer(req.params.id);
            req.session.passport.user = customer;
            req.session.message = "ok";
            req.session.save(function (err) {
                console.log(err);
                res.render('user/information', { newinfo: customer });
            })

        } else {
            req.session.save(function (err) { console.log(err); })
            res.render('user/information', { error: "duplicate email" });
        }
    }
    
    async applyForVendor(req,res){
        const valid = await userService.applyForVendor(req.params.id);
        if (valid) {
            const customer = await userService.getCustomer(req.params.id);
            console.log(customer.role);
            req.session.passport.user = customer;
            req.session.message = "ok";
            req.session.save(function (err) {
                console.log(err);
                res.redirect('/vendor/vendorapplied');
            })

        } else {
            req.session.save(function (err) { console.log(err); })
        }
    }

    changePassword(req, res) {
        res.render('user/changepassword');
    }

    async storeNewPass(req, res) {
        const valid = await userService.validateChangePass(req.params.id, req.body);
        if (valid === 1) {
            res.render('user/changepassword', { message: "Wrong current password" });
        } else if (valid === 2) {
            res.render('user/changepassword', { message: "Cannot change the same password" });
        } else if (valid === 3) {
            res.render('user/changepassword', { message: "Password must contain at last 8 characters" });
        } else if (valid === 4) {
            res.render('user/changepassword', { message: "Retype does not match new password" });
        } else {
            res.render('user/changepassword', { success: "Password has been changed" });
        }
    }

    async Cart(req,res){
        const cartuser =  await userService.getCustomer(res.locals.user._id);
        res.render("cart", {cartuser});
    }

    async deleteCart(req, res) {
        const bookID = req.body.bookID;
        const userID = req.body.userID;
        const vendorID = req.body.vendorID;
        const error = await cartService.removeProductFromCart(userID, bookID,vendorID);
        if (!error) {
            
        } else res.send({ error }); //remove fail
    }

    async updateCart(req, res) {
        const bookID = req.body.bookID;
        const userID = req.body.userID;
        const vendorID = req.body.vendorID;
        const quantity=parseInt(req.body.quantity);
        const error = await cartService.updateCart(userID, bookID,vendorID,quantity);
        if (!error) {
            
        } else res.send({ error }); //remove fail
    }
}

module.exports = new UserController;