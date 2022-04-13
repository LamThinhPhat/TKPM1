const productService = require('../services/productService');

class VendorController {
    
    ManageOrder(req, res){
        res.render('vendor/manageorder');
    }

    async ManageProduct(req, res) {
        const request = req.query;
        const page = request.page || 1;
        const vendor_id=req.params.id;
        delete request.page;

        try {
            const [product, pages] = await productService.getVendorProduct(page,vendor_id);
            res.render('vendor/manageproduct', {vendor_id, product, pages, currentPage: page });
        } catch (err) {
            console.log(err);
        }
    }

    CreateProduct(req, res) {
        const vendor_id=req.params.id;
        try {
            console.log(vendor_id);
        res.render('vendor/createproduct',{vendor_id});
    } catch (err) {
        console.log(err);
    }    
    }
    
    async StoreProduct(req,res){
        const vendor_id=req.params.id;
    try {
            await productService.addNew(req.body, req.file,vendor_id);
            res.redirect(301, '/vendor/manageproduct/'+vendor_id);
    } catch (err) {
        console.log(err);
    }  
    }

    async deleteProduct(req, res) {
        try {
        const productid=req.params.id;
        const vendor_id=await productService.deleleProduct(productid);
        res.redirect(301, '/vendor/manageproduct/'+vendor_id);
    } catch (err) {
        console.log(err);
    }  
    }

    async editForm(req, res) {
        const book_id=req.params.id;
        const editProduct = await productService.getEditProduct(book_id);
        res.render('vendor/editProduct', { editProduct });
    }

    async deleteForm(req, res) {
        const book_id=req.params.id;
        const detail = await productService.getEditProduct(book_id);
        res.render('vendor/deleteproduct', { detail });
    }

    //[PUT] store new product info to database
    async updateProduct(req, res) {
        const product = await productService.updateProduct(req.params.id, req.body, req.file);
        res.redirect(301, '/vendor/manageproduct/'+product.vendor_id);
    }

    VendorApplied(req,res){
        res.render('vendor/vendorapplied');
    }
}

module.exports = new VendorController;