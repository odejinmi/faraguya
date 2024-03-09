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
        unique: true,
        required:true
    },
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
    project_done:{
        type: Number,
        default:0
    },
    ongoing_task:{
        type: Number,
        default:0
    },
    online_status:{
        type: Number,
        default:0
    },
    performance:{
        type: Number,
        default:0
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

module.exports = mongoose.model('Developer', developerSchema);