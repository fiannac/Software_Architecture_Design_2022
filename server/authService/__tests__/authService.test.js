const Server = require('../HTTPinterface.js');
const request = require("supertest");

const app = new Server()

let id = 0;
let token = 0;

describe("Test di auth service", () => {
    test("Test di registrazione", async () => {
        const res = await request(app.app).post("/register").send({
            userName: "test",
            password: "test",
            email: "test@test.it",
            prk: "test",
            puk: "test"
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
          })
        id = res.body.id;
    });


    test("Test di login prima di aver verificato l'account", async () => {
        const res = await request(app.app).post("/login").send({
            userName: "test",
            password: "test"
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
            })
    });

    test("Verifica dell'account", async () =>{
        const res = await request(app.app).post("/activate").send({
            id: id,
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
        })
    });

    test("Test di login correttamente eseguito", async () => {
        const res = await request(app.app).post("/login").send({
            userName: "test",
            password: "test"
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
            res.body.id != null;
            res.body.token != null;
            res.body.prk != 'test';
            res.body.puk != 'test';
        })
        id = res.body.id;
        token = res.body.token;
        console.log(token)
    });

    test("Test di login con credenziali errate", async () => {
        const res = await request(app.app).post("/login").send({
            userName: "test",
            password: "test1"
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
        })
    });

    test("test di register con email già utilizzata", async () => {
        const res = await request(app.app).post("/register").send({
            userName: "test2",
            password: "test",
            email: "test@test.it",
            prk: "test",
            puk: "test"
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
        });
    });

    test("test di register con username già utilizzato", async () => {
        const res = await request(app.app).post("/register").send({
            userName: "test",
            password: "test1",
            email: "test1@test.it",
            prk: "test",
            puk: "test"
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
        })});

    test("test checktoken con token non valido", async () => {
        const res = await request(app.app).post("/checktoken").send({
            id: id,
            token: "test"
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
        })}
    );

    test("test checktoken con token valido", async () => {
        const res = await request(app.app).post("/checktoken").send({
            id: id,
            token: token
        })
        .expect(200).expect((res) => {
            res.body.ok = true;

        })});

    test("test di logout", async () => {
        const res = await request(app.app).post("/logout").send({
            id: id
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
        })});
});
    