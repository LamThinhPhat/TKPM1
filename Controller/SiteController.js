class SiteController{

    AboutPage(req,res){
        res.render('about');
    }

    HomePage(req,res){
        res.render('index');
    }

    Product(req,res){
        res.render('product');
    }

    SignUp(req,res){
        res.render("signup");
    }

    Cart(req,res){
        res.render("cart");
    }
}

module.exports=new SiteController;