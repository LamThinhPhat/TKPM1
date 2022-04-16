const user = require('../Model/user');
const product =require('../Model/product');
const voucher =require('../Model/voucher');


const removeProductFromCart = async (userID, bookID,vendorID) => {
    try {
        let cart = await user.findOne({ _id: userID });
        for (let i = 0; i < cart.cart.length; i++) {
            if (cart.cart[i].vendor_id === vendorID) {
                for (let j = 0; j < cart.cart[i].items.length; j++) {
                    if(cart.cart[i].items[j].id===bookID){
                        cart.cart[i].total=cart.cart[i].total-cart.cart[i].items[j].total;
                        cart.cart[i].items.splice(j,1);
                        break;
                    }
                }
                if(cart.cart[i].items.length===0) cart.cart.splice(i,1);            
            }
        }
        await cart.markModified('cart');
        await cart.save();
        return 0; //success
    } catch (err) {
        console.log(err)
        return 1; //delete fail
    }
}

const updateCart = async (userID, bookID,vendorID,quantity) => {
    try {
        let cartUser = await user.findOne({ _id: userID });
        for (let i = 0; i < cartUser.cart.length; i++) {
            if (cartUser.cart[i].vendor_id === vendorID) {
                for (let j = 0; j < cartUser.cart[i].items.length; j++) {
                    if(cartUser.cart[i].items[j].id===bookID){
                        let price_dif=quantity- cartUser.cart[i].items[j].quantity;
                        cartUser.cart[i].items[j].quantity=quantity;
                        cartUser.cart[i].items[j].total=cartUser.cart[i].items[j].price*cartUser.cart[i].items[j].quantity;
                        cartUser.cart[i].total=cartUser.cart[i].total+cartUser.cart[i].items[j].price*price_dif;
                        break;
                    }
                }
            }
        }
        await cartUser.markModified('cart');
        await cartUser.save();
        return 0; //success
    } catch (err) {
        console.log(err)
        return 1; //delete fail
    }
}

const addCart = async (userid,bookid,quantity)=>{
    let cartUser=await user.findOne({ _id: userid });
    const book= await product.findOne({_id:bookid});
    const vendor=await user.findOne({_id:book.vendor_id});
    let new_vendor_row={ 
        "vendor_email":vendor.email,
        "vendor_id":vendor._id.toString(),
        "total":quantity*book.price,
        "voucher_applied":"",
        "items":[{
            "id":book._id.toString(),
            "name":book.name,
            "price":book.price,
            "quantity":quantity,
            "total":quantity*book.price,
            "image":book.image,
            "amount":book.amount
        }]
    }
    let new_vendor=true;
    let new_item=true; 
    let index=0;
    for (let i = 0; i < cartUser.cart.length; i++) {
        if (cartUser.cart[i].vendor_id === new_vendor_row.vendor_id) {
            new_vendor=false;
            index=i;
            for (let j = 0; j < cartUser.cart[i].items.length; j++) {
                if(cartUser.cart[i].items[j].id===bookid){
                    new_item=false;
                    updateCart(userid,bookid,quantity);
                    break;
                }

            }
        }
    }
    if(new_vendor) cartUser.cart.push(new_vendor_row);
    if(!new_vendor){
        if(new_item)
        {
            cartUser.cart[index].items.push(new_vendor_row.items[0]);
            cartUser.cart[index].total=cartUser.cart[index].total+quantity*book.price;
        }
    }
    await cartUser.markModified('cart');
    await cartUser.save();
    return 0; //success
}

const getCart = async (userid,reqPage) => {
    let cart = [];
    let pages = [];

    try {
        const cartUser=await user.findOne({ _id: userid });
        const perPage = 3;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < cartUser.cart.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?page=${i + 1}`;
            pages.push(temp);
        }
        cartUser.cart =  cartUser.cart .slice(start, end);

        return [cartUser, pages];
    } catch (error) {
        console.log(error)
}
}

const applyVoucher=async(userID, voucher_name)=>{
    try{
    let cartUser=await user.findOne({ _id: userID });
    let found_voucher = await voucher.findOne({name:voucher_name});
    if(found_voucher!=null){
        cartUser.voucher_applied=found_voucher.name;
        cartUser.cart[0].voucher_applied=found_voucher.name;
        if((cartUser.cart[0].total-found_voucher.discount)<0) cartUser.cart[0].total=0;
        else cartUser.cart[0].total=cartUser.cart[0].total-found_voucher.discount;
        console.log(cartUser.cart[0].total);
        await cartUser.markModified('cart');
        await cartUser.markModified('voucher_applied');
        await cartUser.save();
        return 0; //success
    }
}catch{return 1;}
}
module.exports = {
    removeProductFromCart,
    updateCart,
    addCart,
    getCart,
    applyVoucher
}