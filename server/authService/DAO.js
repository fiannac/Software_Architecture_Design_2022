const uuid = require('uuid');

class DAO{
    constructor(){
        this.data = new Map();
        this.UsernameToId = new Map();

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
        this.checkToken = this.checkToken.bind(this);

    }

    async register(userName, password, prk, email){
        if(this.UsernameToId.has(userName)){
            return {ok: false, error: "User already exists"};
        } else {
            let id = uuid.v4();
            this.UsernameToId.set(userName, id);
            this.data.set(id, {userName: userName, password: password, prk: prk, email: email, id:id, token:null});
            return {ok: true, id: id};
        }
    }
    async login(userName, password){
        if(this.UsernameToId.has(userName)){
            let id = this.UsernameToId.get(userName);
            let user = this.data.get(id);
            if(user.password == password){
                let token = uuid.v4();
                user.token = token;
                console.log("Ok login: ", user);
                return {ok: true, id: id, token: token, prk: user.prk};
            } else {
                console.log("Password wrong");
                return {ok: false, error: "Wrong password"};
            }
        } else {
            console.log("User not found");
            return {ok: false, error: "User does not exist"};
        }
    }
    async logout(id, token){
        let user = this.data.get(id);
        console.log("Logout request: ", user);
        if(user?.token === token){
            user.token = null;
            return {ok: true};
        } else {
            return {ok: false, error: "Wrong token"};
        }
    }
    async checkToken(id, token){
        let user = this.data.get(id);
        if(user.token === token){
            return {ok: true};
        } else {
            return {ok: false, error: "Wrong token"};
        }
    }
    
}

module.exports = DAO