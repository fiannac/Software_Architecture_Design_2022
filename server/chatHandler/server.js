const WebSocket = require('ws');
var uuid = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });
const users = new Map();

var last = '';

wss.on('connection', function connection(ws) {
  ws.id = uuid.v1();
  users.set(ws.id, ws);
  last = ws.id;
  ws.on('message', function message(data) {
    console.log('received: %s, from: %s', data, ws.id);
    const msg = JSON.parse(data);
    if(msg?.type == 'login'){
      if(msg.usr == 'matt.conti' && msg.psw == '123'){
        const reply = JSON.stringify({type: 'login', ok:true})
        ws.send(reply)
        console.log("Loggato!");
      } else {
        const reply = JSON.stringify({type: 'login', ok:false})
        ws.send(reply)
        console.log("Dati sbagliati!");
      }
    }
  });
});