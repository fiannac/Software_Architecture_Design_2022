class DAO{
    constructor(){
        this.data = new Map();
        this.usernameToId = new Map();
    }

    async storeData(id, username, puk){
        if(this.data.has(id)){
            return false;
        } else {
            this.data.set(id, {username: username, puk: puk, id:id});
            this.usernameToId.set(username, id);
            return true;
        }
    }

    async userData(username){
        if(!this.usernameToId.has(username)){
            return {ok:false};
        } else {
            const id = this.usernameToId.get(username);
            const data = this.data.get(id);
            return {ok:true, id: data.id, userName: data.username, puk: data.puk};
        }
    }

    async userDataById(id){
        if(this.data.has(id)){
            const data = this.data.get(id);
            return {ok:true, id: data.id, userName: data.username, puk: data.puk};
        } else {
            return {ok:false};
        }
    }
}

module.exports = DAO