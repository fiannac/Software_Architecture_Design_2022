class DAO{
    constructor(){
        this.data = new Map();
        this.UsernameToId = new Map();

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
        this.checkToken = this.checkToken.bind(this);
    }

    async register(userName, password, prk, puk, email, id){
        if(this.UsernameToId.has(userName)){
            return {ok: false, error: "User already exists"};
        } else {
            this.UsernameToId.set(userName, id);
            this.data.set(id, {userName: userName, password: password, prk: prk, puk:puk, email: email, id:id, token:null, confirm:false});
            return {ok: true, id: id};
        }
    }

    async confirmAccount(id){
        if(this.data.has(id)){
            if(this.data.get(id).confirm){
                return false
            }
            this.data.get(id).confirm = true;
            return true;
        }
        return false;
    }

    async login(userName, password){
        if(this.UsernameToId.has(userName)){
            let id = this.UsernameToId.get(userName);
            let user = this.data.get(id);
            if(user.password == password && user.confirm == true){
                let token = uuid.v4();
                user.token = token;
                return {ok: true, id: id, token: token, prk: user.prk, puk: user.puk};
            } else {
                return {ok: false, error: "Wrong password or account not confirmed"};
            }
        } else {
            return {ok: false, error: "User does not exist"};
        }
    }

    async checkLoginData(userName, password){
        if(this.UsernameToId.has(userName)){
            let user = this.data.get(id);
            if(user.password == password && user.confirm == true){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async setToken(id, token){
        
    }

    async logout(id, token){
        let user = this.data.get(id);
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