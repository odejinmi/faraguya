const Developer = require("../models/developerModel");
const Chat = require("../models/chatModel");
const  jwt = require('jsonwebtoken');
const ws = require('ws');
const fs = require('fs');


const { JWT_SECRET } = process.env;

async function websocket (server) {
    console.log(`Hello, !`);

    var wss = new ws.WebSocketServer({server});
    wss.on('connection',async function (connection,req) {

        function notifyAboutOnlinePeople(){
            console.log([...wss.clients].map(c => c.userdetails.email ));
            [...wss.clients]
                .forEach(client => {
                    client.send(JSON.stringify({
                            online: [...wss.clients].map(c => c.userdetails)
                        }
                    ));
                });
        }

        connection.isAlive = true;
        connection.timer = setInterval(()=>{
            connection.ping();
            connection.deathTimer = setTimeout(() => {
                connection.isAlive = false;
                clearInterval();
                connection.terminate();
                notifyAboutOnlinePeople();
                console.log("dead");
            },1000)
        }, 5000);

        connection.on('pong', () => {
            clearTimeout(connection.deathTimer);
            console.log('pong');
        });

        const token = req.headers.token;
        const decode = jwt.verify(token, JWT_SECRET);

        await Developer.findByIdAndUpdate({_id: decode.developer._id}, { $set:{ online_status: 1} });

        connection.userdetails = decode.developer;

        connection.on('message', async (message) => {
            const messageData = JSON.parse(message.toString());
            const{event, data} = messageData;
            if(event === "message" ){
                await messages(connection, data);
            }else if(event === "typing" ){
                await typing(connection, data);
            }
        });

        notifyAboutOnlinePeople();
    });

    wss.on('close', data => {
        console.log('disconnect', data);
    });


    async function messages(connection,messageData){

        const{recipient, text, file} = messageData;
        let filename = null;
        if (file) {
            const parts = file.name.split('.');
            const ext = parts[parts.length - 1];
            filename = Date.now() + "." + ext;
            const path = __dirname + '/public/chat/' + filename;
            const bufferData = new Buffer(file.data.split(',')[1], 'base64');
            fs.writeFile(path, bufferData, () => {
                console.log('file saved: ' + path);
            })
        }
        if(recipient && text) {
            const messageDoc = await Chat.create({
                sender_id: connection.userdetails._id,
                receiver_id: recipient,
                message: text,
                file: file? filename : null
            });
            [...wss.clients]
                .filter(c => c.userdetails._id === recipient)
                .forEach(c => c.send(JSON.stringify({
                    "event": "message",
                    "data": messageDoc
                })));
        }
    }
    async function typing(connection,messageData){

        const{recipient} = messageData;
        if(recipient) {
            [...wss.clients]
                .filter(c => c.userdetails._id === recipient)
                .forEach(c => c.send(JSON.stringify({
                    "event": "typing",
                    "data": {
                        "sender_id": connection.userdetails._id,
                        "receiver_id": recipient,
                    }
                })));
        }
    }
}

module.exports = websocket;