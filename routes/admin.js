const express = require('express');
const router = express.Router();
const AdminController = require('../Controller/AdminController');

router.get('/manageuser', AdminController.ManageUser);

router.get('/managevoucher', AdminController.ManageVoucher);

router.get('/createvoucher', AdminController.CreateVoucher);

router.post('/store', AdminController.StoreVoucher);

router.delete('/delete/:id', AdminController.DeleteVoucher);

router.get('/:id/edit', AdminController.EditPage);
router.put('/edit/:id', AdminController.Editted)

module.exports = router;