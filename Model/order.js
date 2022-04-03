const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order = new Schema({
    id: ObjectId,
    userID: { type: String, required: true },
    products: { type: Array, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    voucher_id: {type: String, required: true},
    total: { type: Number, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('order', order);