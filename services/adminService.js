const voucher =require('../Model/voucher');
const user =require('../Model/user');

const SearchVoucher = async (reqPage, query, search) => {
    let vouchers = [];
    let pages = [];

    try {
        vouchers = await voucher.find({}).lean();
        const perPage = 6;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < vouchers.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?page=${i + 1}`;
            pages.push(temp);
        }
        vouchers = vouchers.slice(start, end);
        
        return [vouchers, pages];
    } catch (error) {
        console.log(error)
    }
    
}

const SearchUser = async (reqPage, query, search) => {
    let users = [];
    let pages = [];

    try {
        users = await user.find({}).lean();
        const perPage = 8;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < users.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?page=${i + 1}`;
            pages.push(temp);
        }
        users = users.slice(start, end);

        return [users, pages];
    } catch (error) {
        console.log(error)
    }
    
}

const addNew = async (body) => {

    try {
        const newVoucher = new voucher({ ...body});
        console.log(newVoucher);
        await newVoucher.save();
    } catch (err) {
        console.log(err);
    }
}


const deleteVoucher = async (id) => {
    try {
        const delVoucher = await voucher.findOne({ _id: id });
        await delVoucher.remove();
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    SearchVoucher,
    SearchUser,
    addNew,
    deleteVoucher,
}