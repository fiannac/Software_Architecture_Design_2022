const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const UserConnection = require('./userConnection.js');
const AuthHandler = require('../controller/authHandler.js');
const MsgHandler = require('../controller/msgHandler.js');
const InfoHandler = require('../controller/infoHandler.js');

class ClientInterface {
    constructor() {

        this.socketToId = new Map();
        this.userConnections = new Map(); //mappa di userconnection

        this.AuthHandler = new AuthHandler()
        this.MsgHandler = new MsgHandler()
        this.InfoHandler = new InfoHandler()

        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });

        this.initServer();
        this.initWSS()

        this.port = 8888;
        this.server.listen(process.env.PORT || this.port, () => {
            console.log(`HTTP Server started on port ${this.server.address().port} :)`);
        });
    }

    initServer(){
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(cors({origin: '*'}));

        this.app.post('/register', this.AuthHandler.registerRequest); //bind?
        this.app.post('/login', this.AuthHandler.loginRequest);
        this.app.post('/logout', this.AuthHandler.logoutRequest);

        this.app.post('/userdata', this.InfoHandler.userDataRequest);
        this.app.post('/userdataId', this.InfoHandler.userDataIdRequest);

        this.app.post('/storedmsg', this.MsgHandler.storedMsgRequest);
        this.app.post('/msg', this.MsgHandler.msgRequest);  
    }
    
    initWSS(){
        let socketToId = this.socketToId
        let userConnections = this.userConnections
        let AuthHandler = this.AuthHandler

        this.wss.on('connection', function(ws, req, client) {
            console.log("Nuovo client connesso")
            ws.on('message', async function(message) {
                const msg = JSON.parse(message);
                if(msg.id == null || msg.token == null){
                    return
                }
                if(userConnections.has(msg.id)){
                    if(userConnections.get(msg.id).token == msg.token){
                        userConnections.get(msg.id).socket = ws
                        ws.send(JSON.stringify({type:'auth',ok:true}))
                        console.log("ID: " + msg.id + " joined")
                    }
                } else {
                    const val = await AuthHandler.checkToken(msg.id,msg.token);
                    if(val == true){
                        userConnections.set(msg.id, new UserConnection(msg.id, msg.token, ws));
                        socketToId.set(ws, msg.id);
                        ws.send(JSON.stringify({type:'auth',ok:true}))
                        console.log("ID: " + msg.id + " joined")
                    }
                }
            })
            ws.on('close', function(message) {
                if(socketToId.has(ws)){
                    console.log("ID: " + socketToId.get(ws), " left")
                    const id = socketToId.get(ws);
                    userConnections.delete(id);
                    socketToId.delete(ws);
                }
            })
        }
        );
    }


}

module.exports = ClientInterface;