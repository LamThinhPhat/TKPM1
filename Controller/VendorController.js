const productService = require('../services/productService');

class VendorController {
    
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
    VendorApplied(req,res){
        res.render('vendor/vendorapplied');
    }
}

module.exports = new VendorController;