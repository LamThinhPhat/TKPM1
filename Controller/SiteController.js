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

    Cart(req,res){
        res.render("cart");
    }
    async Search(req,res){
        const perPage = 8;
        let page = parseInt(req.query.page) || 1;
        try {
            const products = await Product.find({
            name: { $regex: req.query.search, $options: "i" },
            })
            .sort("-id")
            .skip(perPage*page-perPage)
            .limit(perPage)
            .exec();
            const count = await Product.count({
            name: { $regex: req.query.search, $options: "i" },
            });
            console.log(products)
            if (page==1){
                res.render("search",{
                    products,
                    count,
                    page
            });}
            else {res.json({
                products,
                count,
                page
            })}
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    }
}

module.exports=new SiteController;