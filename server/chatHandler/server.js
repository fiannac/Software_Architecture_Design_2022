const WebSocket = require('ws');
const uuid = require('uuid');
const axios = require('axios');
const express = require('express');
const http = require('http');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const wss = new WebSocket.Server({ server });

const port = 8888

const users = new Map();

app.use(cors({
  origin: '*'
}));

app.post('/register', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({key:"value"}));
})

app.post('/login', (req, res) => {
  console.log("Richiesta di login:")
  console.log("Dati: ${req.body.usr}, ${req.body.psw}")
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ok:true, token:"pippo", id:"69"}));
})

wss.on('connection', function connection(ws) {
  console.log("Nuova connessione ws")

  ws.on('message', async function message(data) {
    console.log('received: %s', data);
    ws.send(JSON.stringify({ok:true, type:'auth'}))
   
  });
});


server.listen(process.env.PORT || port, () => {
  console.log(`HTTP Server started on port ${server.address().port} :)`);
});