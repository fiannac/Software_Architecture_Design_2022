const DAO = require('./DAO.js');
const path = require('path');
const fs = require('fs');

class RequestController{
    
    constructor(){
        this.dao = new DAO();
    }

    async storeData(id, userName, puk){
        let ok = await this.dao.storeData(id, userName, puk);
        return {ok:ok};
    }

    async userData(username){
        let userData = await this.dao.userData(username);
        return userData;
    }

    async userDataById(id){
        let userData = await this.dao.userDataById(id);
        return userData;
    }

    async setAvatar(id, file){
        let ok = await this.dao.setAvatar(id, file);
        return {ok:ok};
    }

    async getAvatar(id){
        const targetPath = path.join(__dirname, "./uploads/" +id+ ".jpg");
        
        const res = new Promise((resolve)=>{
            fs.readFile(targetPath, (err, data)=>{
                if(err){
                    resolve(path.join(__dirname, "./uploads/default.jpg"));
                }else{
                    resolve(targetPath);
                }
            }
            )
        });

        return res;
    }
}

module.exports = RequestController;