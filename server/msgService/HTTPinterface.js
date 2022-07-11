const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const RequestController = require('./requestController.js');

class HTTPinterface{
    constructor(){
        this.app = express();
        this.server = http.createServer(this.app);

        this.controller = new RequestController()
        this.initServer();
    
        this.port = 8890;
        this.server.listen(process.env.PORT || this.port, () => {
            console.log(`HTTP Message Server started on port ${this.server.address().port} :)`);
        });
    }

    initServer(){
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(cors({origin: '*'}));

        this.app.post('/storeMsg', this.storeMsg.bind(this));
        this.app.post('/storedMsgRequest', this.storedMsgRequest.bind(this));
        this.app.post('/blockUser', this.blockUser.bind(this));
        this.app.post('/checkBlock', this.checkBlock.bind(this));
    }

    async storeMsg(req, res){
        const r = await this.controller.storeMsg(req.body.idMittente, req.body.idDestinatario, req.body.text, req.body.keyD, req.body.timestamp);
        res.send(JSON.stringify(r));
    }

    async storedMsgRequest(req, res){
        const r = await this.controller.storedMsgRequest(req.body.idDestinatario);
        res.send(JSON.stringify(r));
    }

    async blockUser(req, res){
        const r = await this.controller.blockUser(req.body.id, req.body.idBlocked);
        res.send(JSON.stringify(r));
    }

    async checkBlock(req, res){
        const r = await this.controller.checkBlock(req.body.id, req.body.idBlocked);
        res.send(JSON.stringify(r));
    }
}


const httpInterface = new HTTPinterface();