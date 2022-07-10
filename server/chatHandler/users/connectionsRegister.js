import connectedUser from "./connectedUser.js";

export default class ConnectionsRegister{
    constructor(){
        this.connections = new Map();
        this.WsToId = new Map();
    }

    sendMsg(text, idMittente, idDestinazione, timestamp, keyM, keyD){
        const conn = this.connections.get(idMittente);
        conn.send(text, idMittente, idDestinazione, timestamp, keyM, keyD);
    }

    deleteUser(id){
        this.connections.delete(id);
    }

    deleteUserByWs(ws){
        const id = this.WsToId.get(ws);
        if(id != null){
            this.deleteUser(id);
            this.WsToId.delete(ws);
        }
    }

    createUser(id, token, ws = null){
        const conn = new connectedUser(id, token, ws);
        this.connections.set(id, conn);

        if(ws != null){
            this.WsToId.set(ws, id);
        }
    }

    getUser(id){
        return this.connections.get(id);
    }

    authConnection(id,Ws){
        const conn = this.connections.get(id);
        conn.setWs(Ws);
        this.WsToId.set(Ws, id);
    }

    checkToken(id,token){
        const conn = this.connections.get(id);
        if(conn == false){
            return false;
        }
        if(conn.getToken() === token){
            return true;
        }
        return false;
    }

    checkUserOnline(id){
        const conn = this.connections.get(id);
        if(conn != null){
            if(conn.ws != null){
                return true;
            }
        }
        return false;
    }
}