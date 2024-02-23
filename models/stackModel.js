const mongoose = require('mongoose');
const stackSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Stack', stackSchema)