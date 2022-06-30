const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

import UserConnection from './userConnection';

export default class ClientInterface {
    constructor(AuthHandler, MsgHandler, InfoHandler) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });

        this.AuthHandler = AuthHandler
        this.MsgHandler = MsgHandler
        this.InfoHandler = InfoHandler

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(cors({origin: '*'}));

        this.socketToId = new Map();
        this.userConnection = new Map(); //mappa di userconnection

        this.wss.on('connection', this.wsConnection.bind(this));

        app.post('/register', this.AuthHandler.registerRequest); //bind?
        app.post('/login', this.AuthHandler.loginRequest);
        app.post('/logout', this.AuthHandler.logoutRequest);
        app.post('/storedmsg', this.MsgHandler.storedMsgRequest);
        app.post('/userdata', this.InfoHandler.userDataRequest);
        app.post('/userdataId', this.InfoHandler.userDataIdRequest);
        app.post('/msg', this.MsgHandler.msgRequest);  

        const port = 8888;

        this.wss.on('connection', this.onConnection.bind(this));

        this.server.listen(process.env.PORT || port, () => {
            console.log(`HTTP Server started on port ${server.address().port} :)`);
        });
    }

    wsConnection(ws){
        ws.on('message', this.onMessage.bind(this));
        ws.on('close', this.onClose.bind(this));
    }

    async onMessage(message){
        const msg = JSON.parse(message);
        const val = await this.AuthHandler.checkToken(msg.id, msg.token);
        if(val == true){
            this.userConnection.set(msg.id, new UserConnection(msg.id, msg.token, ws));
            this.socketToId.set(ws, msg.id);
        }
    }

    onClose(){
        if(this.socketToId.has(ws)){
            const id = this.socketToId.get(ws);
            this.userConnection.delete(id);
            this.socketToId.delete(ws);
        }
    }
}
