const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order = new Schema({
    id: ObjectId,
    userID: { type: String, required: true },
    products: { type: Array, required: true },
    status: { type: String, required: true , default:"Confirmed"},
    voucher_applied: {type: String},
    vendor_id:{type: String, required:true},
    total: { type: Number, required: true },
    method:{type: Number, required:true},
    card_number:{type: Number},
    address:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    cancel:{type:Boolean, default:false},
}, {
    timestamps: true
});

module.exports = mongoose.model('order', order);