const http =require('http');
const socketio =require('socket.io');
const Developer = require("../models/developerModel");

async function socketios (app) {
    const https = http.Server(app);
    const io = socketio(https);
    var usp = io.of('/user-namespace');

    usp.on('connection', async function (socket){
        console.log('Developer Connected');
        console.log(socket);

        var developerid;
        if (socket.handshake.headers?.token !== null){
            developerid = socket.handshake.headers?.token;
        }else if (socket.handshake.auth?.token !== null){
            developerid = socket.handshake.auth?.token;
        }
        console.log('Developer '+ developerid +' Connected');
        await Developer.findByIdAndUpdate({_id: developerid}, { $set:{ online_status: 1} });

        //Developer broadcast online status
        socket.emit('getOnlineUser', {user_id: developerid });
        socket.on('disconnect', async function () {
            console.log("Developer Disconnected");
            await Developer.findByIdAndUpdate({_id: developerid}, { $set:{ online_status: 0} });

            //Developer broadcast online status
            socket.broadcast.emit('getOfflineUser', {user_id: developerid });
        })
    });
}

module.exports = socketios;