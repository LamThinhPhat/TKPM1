var express=require('express');
var router=express.Router();

router.get('/contact',function(req,res,next){
    res.render('contact')
});

module.exports = router;