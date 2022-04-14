const product =require('../Model/product');
const user =require('../Model/user');
const order =require('../Model/order');

const checkOut=async (userid,cardNumber)=>{
    try{
    const cartUser=await user.findOne({ _id: userid });
    var method=1;
    if(cardNumber===undefined) {
        method=0;
        cardNumber=0;
    }

    for (let i = 0; i < cartUser.cart.length; i++){


        var total=cartUser.cart[i].total;
        var voucher_applied=cartUser.cart[i].voucher_applied;
        var vendor_id=cartUser.cart[i].vendor_id;
        var address=cartUser.address;
        var firstName=cartUser.firstName;
        var lastName=cartUser.lastName;
        var products=cartUser.cart[i].items;

        var new_order =new order({userID:userid,products,voucher_applied,vendor_id,total,method,cardNumber,firstName,lastName,address});
        await new_order.save();
        for(let j = 0; j < cartUser.cart[i].items.length; j++){
            var book=await product.findOne({_id:cartUser.cart[i].items[j].id});
            book.amount=book.amount-1;
            book.sale=book.sale+1;
            await book.markModified('amount');
            await book.markModified('sale');
            await book.save();
        }

    }
    cartUser.cart=[];
    cartUser.voucher_applied="";
    await cartUser.markModified('cart');
    await cartUser.markModified('voucher_applied');
    await cartUser.save();
    return 0;
    }catch (err){
        console.log(err)

        return 1;
    }
}

module.exports = {
    checkOut
}

