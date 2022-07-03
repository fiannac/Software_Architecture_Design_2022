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
const users = new Map(); // insieme degli utenti registati, memorizzati per username
const mapIdInUsername = new Map()
const onlineUsers = new Map(); // memorizzato per id
const storedMsg = new Map(); // memorizzato per id

var currId = 69;

app.use(cors({origin: '*'}));

app.post('/register', (req, res) => {
  res.setHeader('Content-Type', 'application/json');


  if(users.has(req.body.userName)){
    res.send(JSON.stringify({ok:false}));
  } else{
    users.set(req.body.userName, {email:req.body.email, password:req.body.password, puk:req.body.puk, prk:req.body.prk, id:'id'+currId})
    mapIdInUsername.set('id'+currId,req.body.userName)
    currId++;
    res.send(JSON.stringify({ok:true}));
  }
})

app.post('/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const username = req.body.userName
  if(!users.has(username)){
    res.send(JSON.stringify({ok:false}))
  } else if(users.get(username).password != req.body.password){
    res.send(JSON.stringify({ok:false}))
  } else {
    onlineUsers.set(users.get(username).id, {token:"token", socket:null})
    res.send(JSON.stringify({ ok:true, token:onlineUsers.get(users.get(username).id).token, id:users.get(username).id, prk: users.get(username).prk }));
  }
})

app.post('/logout', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const id = req.body.id
  const token = req.body.token
  if(!onlineUsers.has(id)){
    res.send(JSON.stringify({ok:false}))
  } else if(onlineUsers.get(id).token != token){
    res.send(JSON.stringify({ok:false}))
  } else {
    onlineUsers.delete(id)
    res.send(JSON.stringify({ok:true}));
  }
})

app.post('/storedmsg', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if(!storedMsg.has(req.body.idDestinatario)){
    storedMsg.set(req.body.idDestinatario, {list:[]})
  }
  res.send(JSON.stringify(storedMsg.get(req.body.idDestinatario)));
  storedMsg.get(req.body.idDestinatario).list = []
})

app.post('/userdata', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if(!users.has(req.body.userNameDest)){
    res.send(JSON.stringify({ok:false}));
  } else{
    res.send(JSON.stringify({ok:true,id:users.get(req.body.userNameDest).id,puk:users.get(req.body.userNameDest).puk}));  
  }
})

app.post('/userdataId', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const id = req.body.idRichiesto

  if(!mapIdInUsername.has(id)){
    res.send(JSON.stringify({ok:false}));
  } else{
    const userName = mapIdInUsername.get(id)
    res.send(JSON.stringify({ok:true,userName:userName,puk:users.get(userName).puk}));  
  }
})


app.post('/msg', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const id = req.body.idMittente;
  const idDest = req.body.idDestinatario;
  const text = req.body.text;
  const token = req.body.token;

  if(onlineUsers.has(idDest)){
    onlineUsers.get(idDest).socket.send(JSON.stringify({type:'msg', idMittente:id, text:text, timestamp:0}));
  } else {
    if(!storedMsg.has(idDest)){
      storedMsg.set(idDest,{list:[]})
    } 
    storedMsg.get(idDest).list.push({idMittente:id, text:text})
  }
  res.send(JSON.stringify({ok:true}));
})

wss.on('connection', function connection(ws) {

  ws.on('message', async function message(data) {
    const msg = JSON.parse(data);
    onlineUsers.get(msg.id).socket = this;
    ws.send(JSON.stringify({ok:true, type:'auth'}))
  });

  ws.onclose = function close() {
    onlineUsers.forEach((value, key) => {
      if(value.socket == this){
        onlineUsers.delete(key)
      }
    }
    )
  }

});

server.listen(process.env.PORT || port, () => {
  console.log(`HTTP Server started on port ${server.address().port} :)`);
});