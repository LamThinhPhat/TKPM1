const user = require('../Model/user');

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
        const cart = await user.findOne({ _id: userID });

        for (let i = 0; i < cart.cart.length; i++) {
            if (cart.cart[i].vendor_id === vendorID) {
                for (let j = 0; j < cart.cart[i].items.length; j++) {
                    if(cart.cart[i].items[j].id===bookID){
                        cart.cart[i].items[j].quantity=quantity;
                        cart.cart[i].items[j].total=cart.cart[i].items[j].price*cart.cart[i].items[j].quantity;
                        break;
                    }
                }
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

module.exports = {
    removeProductFromCart,
    updateCart
}