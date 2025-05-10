const mongoose = require('mongoose')

const colorProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        productId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null
        }

    },
    {
        timestamps: true,
    }
);

const ColorProduct = mongoose.model('ColorProduct', colorProductSchema);

module.exports = ColorProduct;