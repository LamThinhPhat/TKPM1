const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const voucher = new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    discount: { type: Int, required: true },
    status: { type: Boolean, default: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('order', order);