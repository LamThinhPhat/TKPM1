const Product = require("../Model/product")

class SiteController{

    AboutPage(req,res){
        res.render('about');
    }

    HomePage(req,res){
        res.render('index');
    }

    SignUp(req,res){
        res.render("signup");
    }


}

module.exports=new SiteController;