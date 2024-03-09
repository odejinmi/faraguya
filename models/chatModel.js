const mongoose = require('mongoose');
const stackSchema = new mongoose.Schema({
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Developer"
    },
    receiver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Developer"
    },
    task_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },
    message:{
        type: String,
    },
     file:{
        type: String,
    },
    read_status:{
        type: Number,
        default: 0  //0 = unread, 1= read
    },

},
    {timestamps: true}
    );

module.exports = mongoose.model('Chat', stackSchema)