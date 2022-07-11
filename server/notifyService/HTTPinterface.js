import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import RequestController from './requestController.js';

class HTTPinterface{
    constructor(){
        this.app = express();
        this.server = http.createServer(this.app);

        this.controller = new RequestController()
        this.initServer();
    
        this.port = 8892;
        this.server.listen(process.env.PORT || this.port, () => {
            console.log(`HTTP Notify Server started on port ${this.server.address().port} :)`);
        });
    }

    initServer(){
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(cors({origin: '*'}));

        this.app.post('/delete', this.deleteRequest.bind(this));
        this.app.post('/insert', this.insertRequest.bind(this));
        this.app.post('/notify', this.notifyRequest.bind(this));
    }

    async deleteRequest(req, res){
        await this.controller.deleteRequest(req.body.id);
        res.send(JSON.stringify({ok:true}));
    }

    async insertRequest(req, res){
        await this.controller.insertRequest(req.body.id, req.body.notifyToken);
        res.send(JSON.stringify({ok:true}));
    }

    async notifyRequest(req, res){
        await this.controller.notifyRequest(req.body.id);
        res.send(JSON.stringify({ok:true}));
    }
}


const httpInterface = new HTTPinterface();