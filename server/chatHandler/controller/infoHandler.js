import UserDataConnection from '../services/userDataConnection.js';

export default class InfoHandler {
    constructor(){
        this.userDataConnection = new UserDataConnection();
    }
    async userDataRequest(req, res) {
        if(req.body.userNameDest == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        }
        else {
            const userDataReq = await this.userDataConnection.userDataRequest(req.body.userNameDest);
            if(userDataReq.ok == false){
                res.send(JSON.stringify({ok:false}));
            } else {
                res.send(JSON.stringify({ok:true, id: userDataReq.id, userName: userDataReq.userName, puk: userDataReq.puk}));
            }
        }
    }
    async userDataIdRequest(req, res) {
        if(req.body.idRichiesto == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            const userDataReq = await this.userDataConnection.userDataIdRequest(req.body.idRichiesto);
            if(userDataReq.ok == false){
                res.send(JSON.stringify({ok:false}));
            } else {
                res.send(JSON.stringify({ok:true, id: userDataReq.id, userName: userDataReq.userName, puk: userDataReq.puk}));
            }
        }
    }
}
