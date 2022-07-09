var mysql = require('mysql2/promise');

class DAO{
    
    async connect(){
        try{
            var connection = await mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : 'root',
                database : 'hermes'
            });
            return connection;
        }catch(err){
            console.log(err);
        }
    }

    async storeMsg(idMittente, idDestinatario, text, keyD, timestamp){
        try{
            var connection = await this.connect();
            await connection.query("INSERT INTO messages (sender, receiver, text, keyD, timestamp) VALUES (?, ?, ?, ?, ?)", [idMittente, idDestinatario, text, keyD, timestamp]);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async storedMsgRequest(idDestinatario){
        try{
            var connection = await this.connect();
            let result = await connection.query("SELECT * FROM messages WHERE receiver = ?", [idDestinatario]);
            result = result[0]
            console.log(result);
            return {list:result};
        }catch(err){
            console.log(err);
            return {ok: false, error: "Can't connect to database"};
        }
    }

    async deleteStoredMsg(idDestinatario){
        try{
            var connection = await this.connect();
            await connection.query("DELETE FROM messages WHERE receiver = ?", [idDestinatario]);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async blockUser(id, idBlocked){
        try{
            var connection = await this.connect();
            await connection.query("INSERT INTO blocked (receiver, sender) VALUES (?, ?)", [id, idBlocked]);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async unblockUser(id, idBlocked){
        try{
            var connection = await this.connect();
            await connection.query("DELETE FROM blocked WHERE receiver = ? AND sender = ?", [id, idBlocked]);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    
    async checkBlockedUser(id, idBlocked){
        try{
            var connection = await this.connect();
            let result = await connection.query("SELECT * FROM blocked WHERE receiver = ? AND sender = ?", [id, idBlocked]);
            result = result[0]
            if(result.length == 1){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
            return null;
        }
    }
}

module.exports = DAO