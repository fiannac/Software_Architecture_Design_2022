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

        this.app.post('/storeMsg', this.controller.storeMsg.bind(this.controller));
        this.app.post('/storedMsgRequest', this.controller.storedMsgRequest.bind(this.controller));
    }
}


const httpInterface = new HTTPinterface();