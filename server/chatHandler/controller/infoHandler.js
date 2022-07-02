import UserDataConnection from '../services/userDataConnection.js';

export default class InfoHandler {
    constructor(){
        this.userDataConnection = new UserDataConnection();
    }
    async userDataRequest(req, res) {
        console.log("Richiesta di userData")
        if(req.body.userNameDest == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        }
        else {
            const userDataReq = await this.userDataConnection.userDataRequest(req.body.userNameDest);
            if(userDataReq.ok == false){
                console.log("Richiesta fallita")
                res.send(JSON.stringify({ok:false}));
            } else {
                console.log("Richiesta riuscita")
                res.send(JSON.stringify({ok:true, id: userDataReq.id, userName: userDataReq.userName, puk: userDataReq.puk}));
            }
        }
    }
    async userDataIdRequest(req, res) {
        console.log("Richiesta di userData dall'Id")
        if(req.body.idRichiesto == null){
            console.log("Richiesta fallita ",+req.body)
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            console.log("Primo step riuscita")
            const userDataReq = await this.userDataConnection.userDataIdRequest(req.body.idRichiesto);
            if(userDataReq.ok == false){
                console.log("Richiesta fallita", + userDataReq.ok)
                res.send(JSON.stringify({ok:false}));
            } else {
                console.log("Richiesta riuscita")
                res.send(JSON.stringify({ok:true, id: userDataReq.id, userName: userDataReq.userName, puk: userDataReq.puk}));
            }
        }
    }
}
