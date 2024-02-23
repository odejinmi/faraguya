const mongoose = require('mongoose');
const newsletterSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    subscribe:{
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Newsletter', newsletterSchema)