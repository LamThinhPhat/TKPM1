var express=require('express');
var router=express.Router();

router.get('/',function(req,res,next){
    res.render('index')
});
router.get('/about',function(req,res,next){
    res.render('about')
});
router.get('/login',function(req,res,next){
    res.render('login')
});
router.get('/contact',function(req,res,next){
    res.render('contact')
});
router.get('/product',function(req,res,next){
    res.render('product')
});

router.get('/product_detail',function(req,res,next){
    res.render('product_detail')
});

router.get('/signup',function(req,res,next){
    res.render('signup')
});
module.exports = router;