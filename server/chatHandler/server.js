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
  console.log("Richiesta di registrazione")
  console.log(`Dati: ${req.body.usr}, ${req.body.psw}, ${req.body.mail}`)
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ok:true}));
})

app.post('/login', (req, res) => {
  console.log("Richiesta di login")
  console.log(`Dati: ${req.body.usr}, ${req.body.psw}`)
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ok:true, token:"pippo", id:"69"}));
})

app.post('/storedmsg', (req, res) => {
  console.log("Richiesta di stored msg")
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({list : [{dest:'zio', text:'cazzo'},{dest:'zio', text:'cazzium'},{dest:'fra', text:'cazzo'},{dest:'paolo', text:'cazzo'}]}));
})


app.post('/userdata', (req, res) => {
  console.log("Richiesta di userdata")
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({id:420,puk:123}));
})




app.post('/msg', (req, res) => {
  console.log("Richiesta di msg")
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ok:true}));
})

wss.on('connection', function connection(ws) {
  console.log("Nuova connessione ws")

  ws.on('message', async function message(data) {
    console.log('received: %s', data);
    ws.send(JSON.stringify({ok:true, type:'auth'}))
  });

  /*var intervalId = setInterval(function() {
    console.log("invio...")
  ws.send(JSON.stringify({type:'msg',dest:'zio', text:'cazz000000000000o'}))
}, 5000);
*/
});

server.listen(process.env.PORT || port, () => {
  console.log(`HTTP Server started on port ${server.address().port} :)`);
});