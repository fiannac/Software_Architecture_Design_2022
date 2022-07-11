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
    
        this.port = 8891;
        this.server.listen(process.env.PORT || this.port, () => {
            console.log(`HTTP user data Server started on port ${this.server.address().port} :)`);
        });
    }

    initServer(){
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(cors({origin: '*'}));

        this.app.post('/storeData', this.storeData.bind(this));
        this.app.post('/userData', this.userData.bind(this));
        this.app.post('/userDataById', this.userDataById.bind(this));
    }

    async storeData(req, res){
        const ack = await this.controller.storeData(req.body.id, req.body.userName, req.body.puk);
        res.send(JSON.stringify(ack));
    }

    async userData(req, res){
        let userData = await this.controller.userData(req.body.userName);
        res.send(JSON.stringify(userData));
    }

    async userDataById(req, res){
        let userData = await this.controller.userDataById(req.body.id);
        res.send(JSON.stringify(userData));
    }
}


const httpInterface = new HTTPinterface();