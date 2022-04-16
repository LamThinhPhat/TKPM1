const Voucher = require('../Model/voucher')
const User = require('../Model/user')
const adminService = require('../services/adminService');
const voucher = require('../Model/voucher');

class AdminController {

    async ManageUser(req, res) {
        const request = req.query;
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
            res.render('admin/createvoucher');
        } catch (err) {
        console.log(err);
        }
    }

    async StoreVoucher(req,res){
    console.log(req)
    try {
            await adminService.addNew(req.body);
            res.redirect(301, '/admin/managevoucher');
    } catch (err) {
        console.log(err);
    }
    }

    async EditPage(req, res) {
        const voucher_id=req.params.id;
        const item = await voucher.findOne({ _id: voucher_id }).lean();
        res.render('admin/editvoucher', {item});
    }

    async Editted(req, res) {
        await voucher.updateOne({_id: req.params.id}, req.body);
        res.redirect(301, '/admin/managevoucher');
    }

    async DeleteVoucher(req, res) {
        console.log(req.params.id);
        try {
            const voucherid=req.params.id;
            await adminService.deleteVoucher(voucherid);
            res.send('SUCC');
        } catch (err) {
        console.log(err);
        }  
    }

    async BanHammer(req, res) {
        console.log(req.data);
        try {
            const user_id = req.params.id;
            const dummy = await User.findOne({_id: user_id});
            if (dummy.status){
                await User.updateOne({_id: user_id}, {status: false});
            }
            else {await User.updateOne({_id: user_id}, {status: true});}
            res.send(dummy.status);
        }
        catch (err) {
            res.send(req.data);
            console.log(err);
        }  
    }

}

module.exports = new AdminController;