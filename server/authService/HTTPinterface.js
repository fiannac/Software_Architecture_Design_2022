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
    
        this.port = 8889;
        this.server.listen(process.env.PORT || this.port, () => {
            console.log(`HTTP auth Server started on port ${this.server.address().port} :)`);
        });
    }

    initServer(){
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(cors({origin: '*'}));

        this.app.post('/register', this.controller.register.bind(this.controller));
        this.app.post('/login', this.controller.login.bind(this.controller));
        this.app.post('/logout', this.controller.logout.bind(this.controller));
        this.app.post('/checkToken', this.controller.checkToken.bind(this.controller));
    }
}


const httpInterface = new HTTPinterface();