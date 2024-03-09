const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    reporter_id:{
        type: String,
        required: true
    },
    report_image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    report_id:{
        type: String,
        required: true
    },
    sent_to:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    }
},{timestamps:true});

module.exports = mongoose.model('Report', reportSchema);