const user = require('../Model/user');
const product =require('../Model/product');

const removeProductFromCart = async (userID, bookID,vendorID) => {
    try {
        const cart = await user.findOne({ _id: userID });
        for (let i = 0; i < cart.cart.length; i++) {
            if (cart.cart[i].vendor_id === vendorID) {
                for (let j = 0; j < cart.cart[i].items.length; j++) {
                    if(cart.cart[i].items[j].id===bookID){
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
        const cartUser = await user.findOne({ _id: userID });

        for (let i = 0; i < cartUser.cart.length; i++) {
            if (cartUser.cart[i].vendor_id === vendorID) {
                for (let j = 0; j < cartUser.cart[i].items.length; j++) {
                    if(cartUser.cart[i].items[j].id===bookID){
                        cartUser.cart[i].items[j].quantity=quantity;
                        cartUser.cart[i].items[j].total=cartUser.cart[i].items[j].price*cartUser.cart[i].items[j].quantity;
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
    const cartUser=await user.findOne({ _id: userid });
    const book= await product.findOne({_id:bookid});
    const vendor=await user.findOne({_id:book.vendor_id});
    let new_vendor_row={ 
        "vendor_email":vendor.email,
        "vendor_id":vendor._id.toString(),
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
                    cartUser.cart[i].items[j].quantity=cartUser.cart[i].items[j].quantity;
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
        }
    }
    await cartUser.markModified('cart');
    await cartUser.save();
    return 0; //success
}
module.exports = {
    removeProductFromCart,
    updateCart,
    addCart
}