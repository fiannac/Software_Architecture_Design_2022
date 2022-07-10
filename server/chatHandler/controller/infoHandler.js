import UserDataConnection from '../services/userDataConnection.js';

export default class InfoHandler {
    constructor(register){
        this.userDataConnection = new UserDataConnection();
        this.register = register;
    }
    async userDataRequest(req, res) {
        if(req.body.userNameDest == null || req.body.id == null || req.body.token == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        }
        else {
            if(this.register.checkToken(req.body.id, req.body.token)==false){
                res.send(JSON.stringify({ok:false}));
                return;
            }
            const userDataReq = await this.userDataConnection.userDataRequest(req.body.userNameDest);
            if(userDataReq.ok == false){
                res.send(JSON.stringify({ok:false}));
                return;
            } else {
                res.send(JSON.stringify({ok:true, id: userDataReq.id, userName: userDataReq.userName, puk: userDataReq.puk}));
                return;
            }
        }
    }
    async userDataIdRequest(req, res) {
        if(req.body.idRichiesto == null || req.body.id == null || req.body.token == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            if(this.register.checkToken(req.body.id, req.body.token)==false){
                res.send(JSON.stringify({ok:false}));
                return;
            }
            const userDataReq = await this.userDataConnection.userDataIdRequest(req.body.idRichiesto);
            if(userDataReq.ok == false){
                res.send(JSON.stringify({ok:false}));
            } else {
                res.send(JSON.stringify({ok:true, id: userDataReq.id, userName: userDataReq.userName, puk: userDataReq.puk}));
            }
        }
    }
}
