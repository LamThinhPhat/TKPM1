const productService = require('../services/productService');


class ProductController {
    //[GET] all product list
    async allList(req, res) {
        const request = req.query;
        const page = request.page || 1;
        delete request.page;

        try {
            const [product, pages] = await productService.getListProduct(page);
            res.render('product/all', { product, pages, currentPage: page });
        } catch (err) {
            console.log(err);
        }
    }
    async search(req, res){
        const request = req.query;
        console.log(request.search);
        const page = request.page || 1;
        delete request.page;
        try {
            const [product, pages] = await productService.SearchProduct(page, {name: { $regex: request.search, $options: "i" }}, request.search);
            res.render('product/search', { product, pages, currentPage: page, request});
        } catch (err) {
            console.log(err);
        }
    }
    async showDetail(req, res) {
        const page = req.query.page || 1;
        try {
            const [detail, vendor,pages] = await productService.adjustDetail(req.params.slug, page);
            res.render('product/product', { detail,vendor, pages, currentPage: page });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports=new ProductController;