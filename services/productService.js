const product =require('../Model/product');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const getListProduct = async (reqPage) => {
    let products = [];
    let pages = [];

    try {
        products = await product.find({}).lean();
        const perPage = 6;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < products.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?page=${i + 1}`;
            pages.push(temp);
        }
        products = products.slice(start, end);

        products = products.map(item => {
            let name = item.name.length < 25 ? item.name : (item.name.substring(0, 25) + '.....');
            let slug = "/product/" + item.slug;
           return { ...item, name: name, slug: slug }
        })
        return [products, pages];
    } catch (error) {
        console.log(error)
    }
    
}

const adjustDetail = async (slug, reqPage) => {
    let detail = null;
    let pages = [];
    let len = 0;

    try {
        detail = await product.findOne({ slug: slug }).lean();
        return [detail, pages, len];
    } catch (err) {
        console.log(err);
    }
}
const getVendorProduct = async(reqPage,vendor_id)=>{
    let products = [];
    let pages = [];

    try {
        products = await product.find({vendor_id:vendor_id}).lean();
        const perPage = 8;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < products.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?page=${i + 1}`;
            pages.push(temp);
        }
        products = products.slice(start, end);

        products = products.map(item => {
            let name = item.name.length < 25 ? item.name : (item.name.substring(0, 25) + '.....');
            let slug = "/product/" + item.slug;
           return { ...item, name: name, slug: slug }
        })
        return [products, pages];
    } catch (error) {
        console.log(error)
    }
}

const addNew = async (body, file,vendor_id) => {
    try {
        const image="/images/"+file.filename;  
        const newProduct = new product({ ...body,image,vendor_id });
        console.log(newProduct);
        await newProduct.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    adjustDetail,
    getListProduct,
    getVendorProduct,
    addNew,
}