const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, require: true },
        phone: { type: Number },
        avatar: { type: String },
        address: { type: String },
        // access_token: {type: String, required: true},
        // refresh_token: {type: String, required: true},
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;