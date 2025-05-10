const mongoose = require('mongoose')

const categoryChildSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        parentId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null
        }

    },
    {
        timestamps: true,
    }
);

const CategoryChild = mongoose.model('CategoryChild', categoryChildSchema);

module.exports = CategoryChild;