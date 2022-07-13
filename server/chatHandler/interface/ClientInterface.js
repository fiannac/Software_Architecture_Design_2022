import { WebSocketServer } from 'ws';
import  express  from 'express';
import multer from 'multer';
import http from 'http';
import cors from 'cors';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import request from 'request';
import ControllerFacade from '../controller/controllerFacade.js';


export default class ClientInterface {
    constructor() {
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
        this.multer = multer();

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(cors({origin: '*'}));

        this.app.post('/register', this.register.bind(this));
        this.app.post('/login', this.login.bind(this));
        this.app.post('/logout', this.logout.bind(this));

        this.app.post('/userdata', this.userData.bind(this));
        this.app.post('/userdataId', this.userDataId.bind(this));

        this.app.post('/storedmsg', this.storedMsg.bind(this));
        this.app.post('/msg', this.msg.bind(this));  
        this.app.post('/blockUser', this.blockUser.bind(this));

        this.app.post('/setAvatar',  this.multer.single('image'), this.setAvatar.bind(this));

        this.app.get('/activate/:id', this.activateAccount.bind(this)); 
        this.app.get('/avatar/:id/:date', this.image.bind(this));
        this.app.get('/test', (req, res) => {
            res.send('Server is running...');
        })
    }

    async register(req, res){
        console.log("register ", req.body);
        const r = await this.controller.registerRequest(req.body.userName, req.body.password, req.body.email, req.body.puk, req.body.prk);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(r));
    }

    async login(req, res){
        console.log("login ", req.body);
        console.log("login");
        const r = await this.controller.loginRequest(req.body.userName, req.body.password, req.body.notifyToken);
        console.log(r);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(r));
    }

    async logout(req, res){
        console.log("logout ", req.body);
        const r = await this.controller.logoutRequest(req.body.id, req.body.token);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(r));
    }
    
    async activateAccount(req, res){
        console.log("activateAccount ", req.params.id);
        const r = await this.controller.activateAccount(req.params.id);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(r));
    }

    async userData(req, res){
        console.log("userData ", req.body);
        const r = await this.controller.userDataRequest(req.body.userNameDest, req.body.id, req.body.token);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(r));
    }

    async userDataId(req, res){
        console.log("userDataId ", req.body);
        const r = await this.controller.userDataIdRequest(req.body.idRichiesto, req.body.id, req.body.token);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(r));
    }

    async storedMsg(req, res){
        console.log("storedMsg ", req.body);
        const r = await this.controller.storedMsgRequest(req.body.idDestinatario, req.body.token);
        res.setHeader('Content-Type', 'application/json');
        console.log(r)
        res.send(JSON.stringify(r));
    }
    
    async msg(req, res){
        console.log("msg ", req.body);
        const r = await this.controller.msgRequest(req.body.idMittente, req.body.idDestinatario, req.body.token, req.body.text, req.body.timestamp, req.body.keyD);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(r));
    }

    async blockUser(req, res){
        console.log("blockUser ", req.body);
        const r = await this.controller.blockUserRequest(req.body.id, req.body.idBlocked, req.body.token);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(r));
    }

    async image(req, res){
        const id = req.params.id;
        request("http://localhost:8891/avatar/"+ id).pipe(res);
    }

    async setAvatar(req, res){
        const img = req.file;
        const id = req.body.id;
        const token = req.body.token;
        let r = this.controller.setAvatarRequest(id, token, img);
        res.send(JSON.stringify(r));
    }
    initWSS(){
        let controller = this.controller;
        this.wss.on('connection', function(ws) {
            console.log('Client connected');
            ws.isAlive = true;
            ws.on('pong', ()=>{ws.isAlive = true;});
            ws.on('message', (data) => {controller.authWs(data, ws)})
            ws.on('close', () => {controller.deleteWs(ws)}) 
            ws.on('error', () => {console.log("error");controller.deleteWs(ws)})
        });

        let wss = this.wss;
        const interval = setInterval(function ping() {
            wss.clients.forEach(function each(ws) {
              if (ws.isAlive === false) return ws.terminate();
              ws.isAlive = false;
              ws.ping();
            });
          }, 1000);
    }
}
