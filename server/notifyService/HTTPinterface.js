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

        this.app.post('/delete', this.controller.deleteRequest.bind(this.controller));
        this.app.post('/insert', this.controller.insertRequest.bind(this.controller));
        this.app.post('/notify', this.controller.notifyRequest.bind(this.controller));
    }
}


const httpInterface = new HTTPinterface();