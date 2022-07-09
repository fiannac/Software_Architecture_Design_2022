import mysql from 'mysql2/promise';

export default class DAO{
    
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

    async fetchToken(id){
        try{
            var connection = await this.connect();
            let result = await connection.query("SELECT * FROM notifytoken WHERE id = ?", [id]);
            result = result[0]
            if(result.length == 1){
                return result[0].notifytoken;
            }else{
                return null;
            }
        }catch(err){
            console.log(err);
            return null;
        }
    }

    async storeToken(id, token){
        try{
            var connection = await this.connect();
            await connection.query("INSERT INTO notifytoken (id, notifytoken) VALUES (?, ?)", [id, token]);
        }catch(err){
            console.log(err);
        }
    }

    async deleteToken(id){
        try{
            var connection = await this.connect();
            await connection.query("DELETE FROM notifytoken WHERE id = ?", [id]);
        }catch(err){
            console.log(err);
        }
    }
}