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

    Cart(req,res){
        res.render("cart");
    }
}

module.exports=new SiteController;