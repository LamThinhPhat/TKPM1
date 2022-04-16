const userService = require('../services/userService.js');
const cartService = require('../services/cartService.js');
const orderService = require('../services/orderService.js');

class UserController {
    //[GET] infomation page /user
    InformationPage(req, res) {
        res.render('user/information');
    }

    //[GET] order page /order
    async OrderPage(req, res) {
        const userid =  res.locals.user._id;
        const request = req.query;
        const page = request.page || 1;
        delete request.page;
        try {
        const [order,pages]=await orderService.getOrdersByUser(page,userid);
        res.render('user/order',{order, pages, currentPage: page });
    } catch (err) {
        console.log(err);
    }
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
    async CheckoutPage(req,res){
        const request = req.query;
        const page = request.page || 1;
        const [cartuser, pages] =  await cartService.getCart(res.locals.user._id,page);
        res.render('user/checkout', { cartuser, pages, currentPage: page });
    }
    async Cart(req,res){
        const request = req.query;
        const page = request.page || 1;
        const [cartuser, pages] =  await cartService.getCart(res.locals.user._id,page);
        res.render('cart', { cartuser, pages, currentPage: page });
    }

    async addCart(req,res){
        const userid =  res.locals.user._id;
        const quantity=parseInt(req.body.quantity);
        const bookid= req.body.bookid;
        const error = await cartService.addCart(userid, bookid,quantity);
        if (!error) {
            res.redirect(301,'/user/cart');
        } else res.send({ error }); //remove fail
    }

    async deleteCart(req, res) {
        const bookID = req.body.bookID;
        const userID = req.body.userID;
        const vendorID = req.body.vendorID;
        const error = await cartService.removeProductFromCart(userID, bookID,vendorID);
        if (!error) {
            res.redirect(301,'/user/cart');

        } else res.send({ error }); //remove fail
    }

    async updateCart(req, res) {
        const bookID = req.body.bookID;
        const userID = req.body.userID;
        const vendorID = req.body.vendorID;
        const quantity=parseInt(req.body.quantity);
        const error = await cartService.updateCart(userID, bookID,vendorID,quantity);
        if (!error) {
            res.redirect(301,'/user/cart');

        } else res.send({ error }); //remove fail
    }

    async applyVoucher(req,res){
        const voucher_name = req.body.voucher_name;
        const userID = req.params.id;
        const error = await cartService.applyVoucher(userID, voucher_name);
        if (!error) {
            res.redirect(301,'/user/checkout');
        } else res.send({ error }); //remove fail

    }
    async cancelOrder(req,res){
        const order_id=req.params.id;
        const error = await orderService.cancelOrder(order_id);
        if (!error) {
            res.redirect(301,'/user/order');
        } else res.send({ error }); //remove fail
    }
    async checkOut(req,res){
        const cardNumber=req.body.cardNumber;
        const orders=await orderService.checkOut(req.params.id,cardNumber);
        if (!orders) {
            res.redirect(301,'/user/order');
        } else res.send({ orders }); //remove fail

    }
}

module.exports = new UserController;