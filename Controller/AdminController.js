const Voucher = require('../Model/voucher')
const User = require('../Model/user')
const adminService = require('../services/adminService')

class AdminController {

    async ManageUser(req, res) {
        const request = req.params;
        const page = request.page || 1;
        delete request.page;

        try {
            const [user, pages] = await adminService.SearchUser(page, {_id: request.id}, request.id);
            res.render('admin/manageuser', {user, pages, currentPage: page });
        } catch (err) {
            console.log(err);
        }
    }


    async ManageVoucher(req, res) {
        const request = req.query;
        const page = request.page || 1;
        delete request.page;

        try {
            const [voucher, pages] = await adminService.SearchVoucher(page, {_id: request.id}, request.id);
            res.render('admin/managevoucher', {voucher, pages, currentPage: page });
        } catch (err) {
            console.log(err);
        }
    }

    CreateVoucher(req, res) {
        try {
            console.log(vendor_id);
            res.render('vendor/createvoucher');
        } catch (err) {
        console.log(err);
        }
    }

    async DeleteVoucher(req, res) {
        try {
        const voucherid=req.params.id;
        const vendor_id=await productService.deleleProduct(productid);
        res.redirect(301, '/vendor/manageproduct/'+vendor_id);
        } catch (err) {
        console.log(err);
        }  
    }
}

module.exports = new AdminController;