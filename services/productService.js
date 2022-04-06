const product =require('../Model/product');
const user =require('../Model/user');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

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

const SearchProduct = async (reqPage, query, search) => {
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
            temp.pageA = `?${"search=" + search +"&"}page=${i + 1}`;
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
    let vendor = null;
    let pages = [];
    let len = 0;

    try {
        detail = await product.findOne({ slug: slug }).lean();
        vendor=await user.findOne({_id:detail.vendor_id}).lean(); 
        console.log(vendor);
        return [detail, vendor,pages, len];
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


const deleleProduct = async (id) => {
    try {
        const delProduct = await product.findOne({ _id: id });
        const vendor_id=delProduct.vendor_id;
        const path="./public"+delProduct.image;
        fs.unlink(path, (err) => {
                if (err) {
                    console.log("failed to delete local image:"+err);
                } else {
                    console.log('successfully deleted local image');                                
                }
            });
        await delProduct.remove();
        return vendor_id;
    } catch (err) {
        console.log(err);
    }
}
const getEditProduct = async (id) => {
    try {
        const editProduct = await product.findOne({ _id: id }).lean();

        return editProduct;
    } catch (err) {
        console.log(err);
    }

    return null;
}

const updateProduct = async (id, updatedProduct, file) => {
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
    adjustDetail,
    SearchProduct,
    getListProduct,
    getVendorProduct,
    addNew,
    deleleProduct,
    getEditProduct,
    updateProduct,
}