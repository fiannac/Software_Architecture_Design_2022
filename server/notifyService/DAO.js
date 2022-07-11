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
            await connection.end();
        }
    }

    async fetchToken(id){
        try{
            var connection = await this.connect();
            let result = await connection.query("SELECT * FROM notifytoken WHERE id = ?", [id]);
            await connection.end();
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
            await connection.query("DELETE FROM notifytoken WHERE id = ?", [id]);
            await connection.query("INSERT INTO notifytoken (id, notifytoken) VALUES (?, ?)", [id, token]);
            await connection.end();
        }catch(err){
            console.log(err);
            await connection.end();
        }
    }

    async deleteToken(id){
        try{
            var connection = await this.connect();
            await connection.query("DELETE FROM notifytoken WHERE id = ?", [id]);
            await connection.end();
        }catch(err){
            console.log(err);
            await connection.end();
        }
    }
}