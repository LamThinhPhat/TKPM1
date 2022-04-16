const product =require('../Model/product');
const user =require('../Model/user');
const order =require('../Model/order');

const checkOut=async (userid,cardNumber)=>{
    try{
    const cartUser=await user.findOne({ _id: userid });
    var method=1;
    console.log(cardNumber);
    if(cardNumber==="") {
        method=0;
    }
    for (let i = 0; i < cartUser.cart.length; i++){


        var total=cartUser.cart[i].total;
        var voucher_applied=cartUser.cart[i].voucher_applied;
        var vendor_id=cartUser.cart[i].vendor_id;
        var address=cartUser.address;
        var firstName=cartUser.firstName;
        var lastName=cartUser.lastName;
        var products=cartUser.cart[i].items;
        var card_number=cardNumber;
        var new_order =new order({userID:userid,products,voucher_applied,vendor_id,total,method,card_number,firstName,lastName,address});
        await new_order.save();
        for(let j = 0; j < cartUser.cart[i].items.length; j++){
            var book=await product.findOne({_id:cartUser.cart[i].items[j].id});
            book.amount=book.amount-cartUser.cart[i].items[j].quantity;
            book.sale=book.sale+cartUser.cart[i].items[j].quantity;
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
const getOrdersByUser = async(reqPage,user_id)=>{
    let orders = [];
    let pages = [];

    try {
        orders = await order.find({userID:user_id}).lean();
        const perPage = 8;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < orders.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?page=${i + 1}`;
            pages.push(temp);
        }
        orders = orders.slice(start, end);

        return [orders, pages];
    } catch (error) {
        console.log(error)
    }
}
const getOrderByVendor = async(reqPage,vendor_id)=>{
    let orders = [];
    let pages = [];

    try {
        orders = await order.find({vendor_id:vendor_id}).lean();
        const perPage = 8;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < orders.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?page=${i + 1}`;
            pages.push(temp);
        }
        orders = orders.slice(start, end);

        return [orders, pages];
    } catch (error) {
        console.log(error)
    }
}
const cancelOrder = async (order_id) => {
    try {
        const getOrder = await order.findOne({ _id: order_id });
        getOrder.cancel=true;
        await getOrder.markModified('cancel');
        await getOrder.save();
        return 0; //success
    } catch (err) {
        console.log(err);
    }
}

const changeStatus = async (order_id,status) => {
    try {
        const getOrder = await order.findOne({ _id: order_id });
        getOrder.status=status;
        await getOrder.markModified('cancel');
        await getOrder.save();
        return 0; //success
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    checkOut,
    getOrderByVendor,
    getOrdersByUser,
    cancelOrder,
    changeStatus
}

