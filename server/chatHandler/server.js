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
  console.log("Richiesta di login")
  console.log(req.body.usr)
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ok:true, token:"pippo", id:"69"}));
})

wss.on('connection', function connection(ws) {
  console.log("Nuova connessione")

  ws.send(JSON.stringify({type: "auth", ok: true}))

  ws.id = uuid.v1();
  ws.auth = false;
  ws.userId = '';
  users.set(ws.id, ws);
  last = ws.id;
  ws.on('message', async function message(data) {
    console.log('received: %s, from: %s', data, ws.id);
    const msg = JSON.parse(data);
    /*
    if(msg?.type == 'auth'){
       verifica user e psw
      const checkData = true;
      if(checkData){
        ws.auth = true;
        ws.userId = msg?.usr;
      } else {
        ws.close();
      }
    } else if(ws.auth == false){
      ws.close();
    } else{ */
      if(msg?.type == 'login'){
        /*gestione login*/
        if(msg.usr == 'matt.conti' && msg.psw == '123'){
          const reply = JSON.stringify({type: 'login', ok:true})
          ws.send(reply)
          console.log("Loggato!");
        } else {
          const reply = JSON.stringify({type: 'login', ok:false})
          ws.send(reply)
          console.log("Dati sbagliati!");
        }

      } else if (msg?.type == 'logout'){
        console.log("Socket chiusa con %s", ws.id);

        /*gestione logOut*/

        users.delete(ws.id);
      } else if(msg?.type == 'signup'){

        console.log("Richiesta di registrazione");

        /* handle registrazione*/
      }
    //}
  });
});


server.listen(process.env.PORT || port, () => {
  console.log(`HTTP Server started on port ${server.address().port} :)`);
});