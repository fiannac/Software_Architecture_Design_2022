import { WebSocketServer } from 'ws';
import  express  from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import UserConnection from './userConnection.js';
import AuthHandler from '../controller/authHandler.js';
import MsgHandler from '../controller/msgHandler.js';
import InfoHandler from '../controller/infoHandler.js';

export default class ClientInterface {
    constructor() {

        this.socketToId = new Map();
        this.userConnections = new Map(); //mappa di userconnection

        this.AuthHandler = new AuthHandler(this)
        this.MsgHandler = new MsgHandler(this.userConnections)
        this.InfoHandler = new InfoHandler()

        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocketServer({ server: this.server });

        this.initServer();
        this.initWSS()

        this.port = 8888;
        this.server.listen(process.env.PORT || this.port, () => {
            console.log(`HTTP Server started on port ${this.server.address().port} :)`);
        });
    }

    addUserConnection(id, token){
        this.userConnections.set(id, new UserConnection(id, token, null));
    }
    removeUserConnection(id){
        if(this.userConnections.has(id)){
            if(this.userConnections.get(id).ws != null){
                this.socketToId.delete(this.userConnections.get(id).ws)
            }
            this.userConnections.delete(id);  
        }
        
    }

    initServer(){
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(cors({origin: '*'}));

        this.app.post('/register', this.AuthHandler.registerRequest.bind(this.AuthHandler)); //bind?
        this.app.post('/login', this.AuthHandler.loginRequest.bind(this.AuthHandler));
        this.app.post('/logout', this.AuthHandler.logoutRequest.bind(this.AuthHandler));

        this.app.post('/userdata', this.InfoHandler.userDataRequest.bind(this.InfoHandler));
        this.app.post('/userdataId', this.InfoHandler.userDataIdRequest.bind(this.InfoHandler));

        this.app.post('/storedmsg', this.MsgHandler.storedMsgRequest.bind(this.MsgHandler));
        this.app.post('/msg', this.MsgHandler.msgRequest.bind(this.MsgHandler));  

        this.app.get('/test', (req, res) => {
            res.send('Il server è funzionante!');
        })
    }
    
    initWSS(){
        let socketToId = this.socketToId
        let userConnections = this.userConnections
        let AuthHandler = this.AuthHandler

        this.wss.on('connection', function(ws, req, client) {
            console.log("Nuovo client connesso")
            ws.on('message', async function(message) {
                console.log("Messaggio ricevuto: " + message)
                const msg = await JSON.parse(message);
                console.log("Nuovo messaggio:" + msg)
                if(msg.id == null || msg.token == null){
                    console.log("Errore: id o token nulli "+ msg.id +" "+ msg.token)
                    return
                }
                if(userConnections.has(msg.id)){
                    if(userConnections.get(msg.id).token == msg.token){
                        console.log("Aggiungo la socket alla mappa")
                        userConnections.get(msg.id).ws = ws
                        console.log(userConnections.get(msg.id))
                        ws.send(JSON.stringify({type:'auth',ok:true}))
                        console.log("ID: " + msg.id + " joined")
                    }
                } else { //potrebbe essere inutile
                    console.log("Aggiungo user alla mappa")
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
