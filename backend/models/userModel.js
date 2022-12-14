const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please add name']
        },
        password: {
            type: String,
            required: [true, 'Please add password']
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true
        },
        isAdmin: {
            type: Boolean,
            required: [true],
            default: false
        },
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)