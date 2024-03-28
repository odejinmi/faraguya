const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    task_id:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    developers:{
        type: Array,
        required: true
    },
    status:{
        type: Number,
        default:0
    },
    task_image:{
        type:String,
        required:false
    },
    start_date:{
        type:String,
        required:false
    },
    due_date:{
        type:String,
        required:false
    },
    available:{
        type: Number,
        default:0
    },

},{timestamps:true});

module.exports = mongoose.model('Subtask', taskSchema);