const mongoose = require('mongoose')

const rompProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

const RomProduct = mongoose.model('RomProduct', rompProductSchema);

module.exports = RomProduct;