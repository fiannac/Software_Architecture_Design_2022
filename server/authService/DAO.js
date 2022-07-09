const uuid = require('uuid');
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
    
    async register(id, username, password, email, prk, puk, confirm){
        try{
            var connection = await this.connect();
            await connection.query("INSERT INTO user (id, username, password, email, prk, puk, confirm) VALUES (?, ?, ?, ?, ?, ?, ?)", [id, username, password, email, prk, puk, confirm]);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    
    
    //confirm user account
    async confirmAccount(token){
        try{
            var connection = await this.connect();
            await connection.query("UPDATE user SET confirm = 1 WHERE token = ?", [token]);
            return true;
        }catch(err){
            return false;        
        }
    }
    
    async login(username, password, token){
        try{
            var connection = await this.connect();
            let result = await connection.query("SELECT * FROM user WHERE username = ? AND password = ?", [username, password]);
            result = result[0]
            if(result.length == 1){
                if(result[0].confirm == 1){
                    await connection.query("UPDATE user SET token = ? WHERE username = ? AND password = ?", [token, username, password]);
                    return {ok: true, id: result[0].id, token: token, prk: result[0].prk, puk: result[0].puk};
                }else{
                    return {ok: false, error: "Account not confirmed"};
                }
            }else{
                return {ok: false, error: "User does not exist"};
            }
        }catch(err){
            console.log(err);
        }
    }
    
    //logout user removin his token
    async logout(id, token){
        try{
            var connection = await this.connect();
            let result = await connection.query("SELECT * FROM user WHERE id = ? AND token = ?", [id, token]);
            result = result[0]
            if(result.length == 1){
                await connection.query("UPDATE user SET token = NULL WHERE id = ? AND token = ?", [id, token]);
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
        }
    }
    
    
    
    async checkToken(id, token){
        try{
            var connection = await this.connect();
            let result = await connection.query("SELECT * FROM user WHERE id = ? AND token = ?", [id, token]);
            result = result[0]
            if(result.length == 1){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
        }
    }
    
}

module.exports = DAO