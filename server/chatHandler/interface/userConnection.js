class UserConnection {
    constructor(id, token, ws) {
        this.id = id
        this.token = token
        this.ws = ws
    }

    getId(){
        return this.id
    }
    getToken(){
        return this.token
    }
    getWs(){
        return this.ws
    }
}

module.exports = UserConnection