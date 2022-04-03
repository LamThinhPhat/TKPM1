const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const product = new Schema({
    id: ObjectId,
    name: { type: String, maxlength: 100, required: true },
    price: { type: Number, required: true },
    image: { type: Array },
    category: { type: String, required: true },
    description: { type: Array },
    publisher: { type: String, required: true },
    slug: { type: String, slug: 'name' }
}, {
    timestamps: true
});

module.exports = mongoose.model('product', product);