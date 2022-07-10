const Server = require('../HTTPinterface.js');
const request = require("supertest");
const reduce = require('bluebird/js/release/reduce.js');

const app = new Server()

describe("Test di userDataService", () => {
    test("Store data", async () => {
        const res = await request(app.app).post("/storeData").send({
            id:'1',
            userName:'test',
            puk:'12345'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
          })
    });

    test("User data by id", async () => {
        const res = await request(app.app).post("/userDataById").send({
            id:'1'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
            res.body.userName = 'test';
            res.body.puk = '12345';
            res.body.id = '1';
        })
    }
    );

    test("User data by userName", async () => {
        const res = await request(app.app).post("/userData").send({
            userName:'test'
        })
        .expect(200).expect((res) => {
            res.body.ok = true;
            res.body.userName = 'test';
            res.body.puk = '12345';
            res.body.id = '1';
        })
    }
    );

    test("User data by userName non presente", async () => {
        const res = await request(app.app).post("/userData").send({
            userName:'test2'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
        })
    });

    test("User data by id non presente", async () => {
        const res = await request(app.app).post("/userDataById").send({
            id:'2'
        })
        .expect(200).expect((res) => {
            res.body.ok = false;
        })
    });

}
);
