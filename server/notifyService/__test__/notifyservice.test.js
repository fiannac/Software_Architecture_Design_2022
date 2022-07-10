import Server from '../HTTPinterface.js';
import request from "supertest";

const app = new Server()

describe("Test di insert notify request", () => {
    test("Test store message", async () => {
        const res = await request(app.app).post("/insert").send({
            id:'1',
            token:'1'
        })
        .expect(200)
    });


    test("Test di notify request", async () => {
        const res = await request(app.app).post("/notify").send({
            id:'1',
        })
        .expect(200)
    });

    test("Test di delete notify request", async () =>{
        const res = await request(app.app).post("/delete").send({
            id: '1'
        })
        .expect(200)
    });

    test("test di notify ad un utente non presente", async () => {
        const res = await request(app.app).post("/notify").send({
            id: '1'
        })
        .expect(200)
    });

});