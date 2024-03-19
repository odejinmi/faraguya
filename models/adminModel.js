const mongoose = require('mongoose');
const developerSchema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required:true
    },
    token:{
        type:String,
        required:false
    },
    last_login:{
        type:String,
        required:false
    },
    Registered_on:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model('Admin', developerSchema);