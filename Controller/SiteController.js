const Product = require("../Model/product")
const productservice = require("../services/productService")

class SiteController{

    AboutPage(req,res){
        res.render('about');
    }

    async HomePage(req,res){
        const random_product = await productservice.getRandomProduct();
        const random_featured = await productservice.getFeaturedProduct();
        console.log(random_product);
        res.render('index',{random_product,random_featured});
    }

    SignUp(req,res){
        res.render("signup");
    }


}

module.exports=new SiteController;