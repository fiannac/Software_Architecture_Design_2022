import { WebSocketServer } from 'ws';
import  express  from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import ControllerFacade from '../controller/controllerFacade.js';

export default class ClientInterface {
    constructor() {

        this.socketToId = new Map();

        this.controller = new ControllerFacade();

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

    initServer(){
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(cors({origin: '*'}));

        this.app.post('/register', this.controller.registerRequest.bind(this.controller));
        this.app.post('/login', this.controller.loginRequest.bind(this.controller));
        this.app.post('/logout', this.controller.logoutRequest.bind(this.controller));

        this.app.post('/userdata', this.controller.userDataRequest.bind(this.controller));
        this.app.post('/userdataId', this.controller.userDataIdRequest.bind(this.controller));

        this.app.post('/storedmsg', this.controller.storedMsgRequest.bind(this.controller));
        this.app.post('/msg', this.controller.msgRequest.bind(this.controller));  
        this.app.post('/blockUser', this.controller.blockUserRequest.bind(this.controller));

        this.app.get('/activate/:id', this.controller.activateAccount.bind(this.controller)); 
        
        this.app.get('/test', (req, res) => {
            res.send('Server is running...');
        })
    }
    
    initWSS(){
        let controller = this.controller;
        this.wss.on('connection', function(ws) {
            console.log('Client connected');
            ws.on('message', (data) => {controller.authWs(data, ws)})
            ws.on('close', () => {controller.deleteWs(ws)}) 
        });

    }


}
