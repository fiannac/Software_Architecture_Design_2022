export default class DAO{
    constructor(){
        this.data = new Map();
    }

    async fetchToken(id){
        return this.data.get(id);
    }

    async storeToken(id, token){
        this.data.set(id, token);
    }

    async deleteToken(id){
        this.data.delete(id);
    }
}