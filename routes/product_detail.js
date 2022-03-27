var express=require('express');
var router=express.Router();

router.get('/product_detail',function(req,res,next){
    res.render('product_detail')
});

module.exports = router;