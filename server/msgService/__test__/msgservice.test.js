const Server = require('../HTTPinterface.js');
const request = require("supertest");

const app = new Server()

describe("Test di msgService", () => {
    test("Test store message", async () => {
        const res = await request(app.app).post("/storeMsg").send({
            idMittente:'1',
            idDestinatario:'2',
            text:'text',
            keyD:'1',
            timestamp:'0'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
          })
    });


    test("Test di request stored msgs", async () => {
        const res = await request(app.app).post("/storedMsgRequest").send({
            idMittente:'1',
        })
        .expect(200).expect((res) => {
            res.body.list = [];
            })
    });

    test("Test di block user", async () =>{
        const res = await request(app.app).post("/blockUser").send({
            id: '1',
            idBlocked:'2'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
        })
    });

    test("test di unblock user", async () => {
        const res = await request(app.app).post("/blockUser").send({
            id: '1',
            idBlocked:'2'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
        })
    });

});