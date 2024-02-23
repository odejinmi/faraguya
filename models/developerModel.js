const mongoose = require('mongoose');
const developerSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phonenumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
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
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Developer', developerSchema)