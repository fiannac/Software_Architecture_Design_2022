import Server from "../interface/ClientInterface.js";
import request from "supertest";
import wsrequest from "superwstest"
import WebSocket from "ws";


const app = new Server()

let id = 0;
let prk = 0;
let token = 0;

let ws = new WebSocket("ws://localhost:8888");
let id2 = 0;

describe("Test del chat handler", () => {

    test("Test di registrazione", async () => {
        const res = await request(app.app).post("/register").send({
            userName:'test',
            password:'test',
            email:'test@test.it',
            prk:'test',
            puk:'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
          })
    });

    test("Test di registrazione con formato errato", async () => {
        const res = await request(app.app).post("/register").send({
            userName:null,
            password:null,
            email:null,
            prk:null,
            puk:null
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            }
        )
    }
    );

    test("Test di registrazione con username già utilizzato", async () => {
        const res = await request(app.app).post("/register").send({
            userName:'test',
            password:'test',
            email:'test2@test.it',
            prk:'test',
            puk:'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
          })
    });

    test("Test di registrazione con mail utilizzata", async () =>{
        const res = await request(app.app).post("/register").send({
            userName:'test1',
            password:'test',
            email:'test@test.it',
            prk:'test',
            puk:'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
          })
    });

    test("Test di login con formato errato", async () => {
        const res = await request(app.app).post("/login").send({
            userName:null,
            password:null
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            })
    }
    );

    test("test di login con username errato", async () => {
        const res = await request(app.app).post("/login").send({
            userName: '1',
            password: 'test',
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
          })
    });

    test("test di login con psw errata", async () => {
        const res = await request(app.app).post("/login").send({
            userName: 'test',
            password: '1'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
          })
    });

    test("test di login con dati corretti", async () => {
        const res = await request(app.app).post("/login").send({
            userName: 'test',
            password: 'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
            res.body.id != null;
            res.body.prk != null;
            res.body.token != null;
        })
        id = res.body.id;
        prk = res.body.prk;
        token = res.body.token;
    });

    test("Test di attivazione di un account", async () => {
        const res = await request(app.app).get("/activate/"+id).send({
        })
        .expect(200)
    });

    test("Richiesta di userdata con formato errato", async () => {
        const res = await request(app.app).post("/userData").send({
            userNameDest: null,
            idRichiesto: null
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            })
    }
    );

    test("Richiesta di userdata con username errato", async () => {
        const res = await request(app.app).post("/userdata").send({
            userNameDest: '0'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            })
    });

    test("Richiesta di userdata con username corretto", async () => {
        const res = await request(app.app).post("/userdata").send({
            userNameDest: 'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
            res.body.userName != null;
            res.body.id != null;
            res.body.puk != null;
            })
    });

    test("Richiesta di userdata formato errato", async () => {
        const res = await request(app.app).post("/userdata").send({
            idRichiesto: null
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            })
    }
    );

    test("Richiesta di userdata by id con id errato", async () => {
        const res = await request(app.app).post("/userdataId").send({
            idRichiesto : '0'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            })
    });
    test("Richiesta di userdata by id con id corretto", async () => {
        const res = await request(app.app).post("/userdataId").send({
            idRichiesto:id
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
            res.body.userName != null;
            res.body.id != null;
            res.body.puk != null;
            })
    });

    test("Richiesta di stored message con formato errato", async () => {
        const res = await request(app.app).post("/storedmsg").send({
            idRichiesto: null
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            })
    }
    );

    test("Richiesta di stored message con token errato", async () => {
        const res = await request(app.app).post("/storedmsg").send({
            idDestinatario: id,
            token: '0'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            }
        )
    });

    test("Richiesta di stored message con token corretto", async () => {
        const res = await request(app.app).post("/storedmsg").send({
            idDestinatario: id,
            token: token
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
            res.body.list = [];
            }
        )
    });

    test("Richiesta di stored message id errato", async () => {
        const res = await request(app.app).post("/storedmsg").send({
            idDestinatario: '0',
            token: token
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            }
        )
    });

    test("Richiesta di invio messaggio con token errato", async () => {
        const res = await request(app.app).post("/msg").send({
            idMittente: id,
            idDestinatario: '0',
            token: '0',
            text: 'test',
            timestamp: 'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            }
        )
    });

    test("Richiesta di invio messaggio con token corretto", async () => {
        const res = await request(app.app).post("/msg").send({
            idMittente: id,
            idDestinatario: '0',
            token: token,
            text: 'test',
            timestamp: 'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
            }
        )
    }
    );

    test("Richiesta di invio messaggio con formato errato", async () => {
        const res = await request(app.app).post("/msg").send({
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            }
        )
    }
    );


    test("Richiesta di invio messaggio con id errato", async () => {
        const res = await request(app.app).post("/msg").send({
            idMittente: '0',
            idDestinatario: '2',
            token: token,
            text: 'test',
            timestamp: 'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            }
        )
    });

    
    test("test di blocca utente con token non valido", async () => {
        const res = await request(app.app).post("/blockUser").send({
            id: id,
            token: "test",
            idBlocked:'6'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
        }
        )}
    );

    test("test di blocca utente con token valido", async () => {
        const res = await request(app.app).post("/blockUser").send({
            id: id,
            token: token,
            idBlocked:'6'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
        }
        )}
    );

    test("test di blocca utente con id non valido", async () => {
        const res = await request(app.app).post("/blockUser").send({
            id: '0',
            token: token,
            idBlocked:'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
        }
        )}
    );

    test("Registrazione, login ed autenticazione del canale di comunicazione", async () => {
        let res = await request(app.app).post("/register").send({
            userName: "test2",
            password: "test2",
            email: "test2@test2.it",
            puk: "test2",
            prk: "test2"
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
        }
        )
        res = await request(app.app).post("/login").send({
            userName: "test2",
            password: "test2"
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
        }
        )
        id2 = res.body.id;
        await wsrequest(app.server).ws('/').sendText(JSON.stringify({type: 'authWS', id: res.body.id, token: res.body.token})).expectText('{"type":"auth","ok":true}');
        console.log(app.controller.register.connections, id2)
    });

    test("Invio di un messaggio ad un utente online", async () => {
        const res = await request(app.app).post("/msg").send({
            idMittente: id,
            idDestinatario: id2,
            token: token,
            text: 'test',
            timestamp: 'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
        }
        )
    }
    );

    test("test di logout con token errato", async () => {
        const res = await request(app.app).post("/logout").send({
            id: id,
            token: "test"
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
        }
        )}
    );

    test("test di logout", async () => {
        const res = await request(app.app).post("/logout").send({
            id: id,
            token: token
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
        })
    });

    
});