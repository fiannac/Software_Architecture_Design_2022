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
  console.log("Richiesta di registrazione")
  console.log(`Dati: ${req.body.userName}, ${req.body.password}, ${req.body.email}`)
  res.setHeader('Content-Type', 'application/json');


  if(users.has(req.body.userName)){
    console.log("utente gia registrato")
    res.send(JSON.stringify({ok:false}));
  } else{
    console.log("registrazione riuscita")
    console.log("Utente:", req.body.userName)
    users.set(req.body.userName, {email:req.body.email, password:req.body.password, puk:req.body.puk, prk:req.body.prk, id:'id'+currId})
    mapIdInUsername.set('id'+currId,req.body.userName)
    currId++;
    res.send(JSON.stringify({ok:true}));
  }
})

app.post('/login', (req, res) => {
  console.log("Richiesta di login")
  console.log(`Dati: ${req.body.userName}, ${req.body.password}`)
  res.setHeader('Content-Type', 'application/json');
  const username = req.body.userName
  if(!users.has(username)){
    console.log("Utente non registrato")
    res.send(JSON.stringify({ok:false}))
  } else if(users.get(username).password != req.body.password){
    console.log("UTENTE HA SBAGLIATO PSWM")
    res.send(JSON.stringify({ok:false}))
  } else {
    console.log("login ok")
    onlineUsers.set(users.get(username).id, {token:"token", socket:null})
    console.log(onlineUsers)
    res.send(JSON.stringify({ ok:true, token:onlineUsers.get(users.get(username).id).token, id:users.get(username).id, prk: users.get(username).prk }));
  }
})

app.post('/logout', (req, res) => {
  console.log("Richiesta di logout")
  console.log(`Dati: ${req.body.id}, ${req.body.token}`)
  res.setHeader('Content-Type', 'application/json');
  const id = req.body.id
  const token = req.body.token
  if(!onlineUsers.has(id)){
    console.log("Utente non registrato")
    res.send(JSON.stringify({ok:false}))
  } else if(onlineUsers.get(id).token != token){
    console.log("UTENTE HA SBAGLIATO TOKEN")
    res.send(JSON.stringify({ok:false}))
  } else {
    console.log("logout ok")
    onlineUsers.delete(id)
    res.send(JSON.stringify({ok:true}));
  }
})

app.post('/storedmsg', (req, res) => {
  console.log("Richiesta di stored msg")
  res.setHeader('Content-Type', 'application/json');
  if(!storedMsg.has(req.body.idDestinatario)){
    console.log("non sono presenti stored msg")
    storedMsg.set(req.body.idDestinatario, {list:[]})
  }
  res.send(JSON.stringify(storedMsg.get(req.body.idDestinatario)));
  console.log("Stored message inoltrati:")
  console.log(storedMsg.get(req.body.idDestinatario))
  storedMsg.get(req.body.idDestinatario).list = []
})

app.post('/userdata', (req, res) => {
  console.log("Richiesta di userdata")
  res.setHeader('Content-Type', 'application/json');

  if(!users.has(req.body.userNameDest)){
    console.log("utente non trovato")
    res.send(JSON.stringify({ok:false}));
  } else{
    console.log("dati inviati")
    res.send(JSON.stringify({ok:true,id:users.get(req.body.userNameDest).id,puk:users.get(req.body.userNameDest).puk}));  
  }
})

app.post('/userdataId', (req, res) => {
  console.log("Richiesta di userdataId")
  res.setHeader('Content-Type', 'application/json');

  const id = req.body.idRichiesto

  console.log(id, mapIdInUsername, users)
  if(!mapIdInUsername.has(id)){
    console.log("utente non trovato")
    res.send(JSON.stringify({ok:false}));
  } else{
    const userName = mapIdInUsername.get(id)
    console.log("dati inviati")
    console.log(userName, users, mapIdInUsername)
    res.send(JSON.stringify({ok:true,userName:userName,puk:users.get(userName).puk}));  
  }
})


app.post('/msg', (req, res) => {
  console.log("Richiesta di msg")
  res.setHeader('Content-Type', 'application/json');
  const id = req.body.idMittente;
  const idDest = req.body.idDestinatario;
  const text = req.body.text;
  const token = req.body.token;

  if(onlineUsers.has(idDest)){
    console.log("utente online, messaggio inoltrato")
    onlineUsers.get(idDest).socket.send(JSON.stringify({type:'msg', idMittente:id, text:text, timestamp:0}));
  } else {
    console.log("utente offline, messaggio storato")
    if(!storedMsg.has(idDest)){
      storedMsg.set(idDest,{list:[]})
    } 
    storedMsg.get(idDest).list.push({idMittente:id, text:text})
  }
  res.send(JSON.stringify({ok:true}));
})

wss.on('connection', function connection(ws) {
  console.log("Nuova connessione ws")

  ws.on('message', async function message(data) {
    console.log('Richiesta auth socket');
    const msg = JSON.parse(data);
    console.log(msg)

    onlineUsers.get(msg.id).socket = this;
    ws.send(JSON.stringify({ok:true, type:'auth'}))
  });

  ws.onclose = function close() {
    console.log("Connessione chiusa")
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