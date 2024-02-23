const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
    workemail:{
        type: String,
        required: true
    },
    phonenumber:{
        type:String,
        required:true
    },
    stack:{
        type: Array,
        required: true
    },
    years_of_experience:{
        type: String,
        required: true
    },
    hourly_budget:{
        type: String,
        required: true
    },
    monthly_budget:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: false
    },
    call_date:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Client', clientSchema)