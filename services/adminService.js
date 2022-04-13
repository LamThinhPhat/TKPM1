const voucher =require('../Model/voucher');
const user =require('../Model/user');

const SearchVoucher = async (reqPage, query, search) => {
    let vouchers = [];
    let pages = [];

    try {
        vouchers = await voucher.find(query).lean();
        const perPage = 6;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < voucher.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?${"search=" + search +"&"}page=${i + 1}`;
            pages.push(temp);
        }
        vouchers = vouchers.slice(start, end);
        
        return [voucher, pages];
    } catch (error) {
        console.log(error)
    }
    
}

const SearchUser = async (reqPage, query, search) => {
    let users = [];
    let pages = [];

    try {
        users = await user.find(query).lean();
        const perPage = 6;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < users.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?${"search=" + search +"&"}page=${i + 1}`;
            pages.push(temp);
        }
        users = users.slice(start, end);

        users = users.map(item => {
            let name = item.name.length < 25 ? item.name : (item.name.substring(0, 25) + '.....');
            let slug = "/user/" + item.slug;
           return { ...item, name: name, slug: slug }
        })
        return [users, pages];
    } catch (error) {
        console.log(error)
    }
    
}

const adjustDetail = async (slug, reqPage) => {
    let detail = null;
    let vendor = null;
    let pages = [];
    let len = 0;

    try {
        detail = await product.findOne({ slug: slug }).lean();
        console.log(vendor);
        return [detail, vendor,pages, len];
    } catch (err) {
        console.log(err);
    }
}

const addNew = async (body) => {
    try {
        const newVoucher = new product({ ...body});
        console.log(newVoucher);
        await newVoucher.save();
    } catch (err) {
        console.log(err);
    }
}


const deleleVoucher = async (id) => {
    try {
        const delVoucher = await voucher.findOne({ _id: id });
        await delVoucher.remove();
    } catch (err) {
        console.log(err);
    }
}

const getEditVoucher = async (id) => {
    try {
        const editVoucher = await voucher.findOne({ _id: id }).lean();

        return editVoucher;
    } catch (err) {
        console.log(err);
    }

    return null;
}

const updateProduct = async (id, updatedProduct) => {
    try {
        if (file === undefined) {
            await product.updateOne({ _id: id }, updatedProduct);
            return await product.findById(id);

        } else {
            let oldProduct = await product.findById(id);
            const path="./public"+oldProduct.image;
            fs.unlink(path, (err) => {
                if (err) {
                    console.log("failed to delete local image:"+err);
                } else {
                    console.log('successfully deleted local image');                                
                }
        });
            const image="/images/"+file.filename;  

            updatedProduct.image = image;
            await product.updateOne({ _id: id }, updatedProduct);
            return await product.findById(id);
        }

    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    SearchVoucher,
    SearchUser,
    
}