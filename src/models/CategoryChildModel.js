const mongoose = require('mongoose')

const categoryChildSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        image: { type: String, required: true },

    },
    {
        timestamps: true,
    }
);

const CategoryChild = mongoose.model('CategoryChild', categoryChildSchema);

module.exports = CategoryChild;