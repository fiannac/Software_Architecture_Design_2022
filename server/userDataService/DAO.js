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

    async storeData(id, username, puk){
        try{
            var connection = await this.connect();
            await connection.query("INSERT INTO publicinfo (id, username, puk) VALUES (?, ?, ?)", [id, username, puk]);
            await connection.end();
            return true;
        }catch(err){
            await connection.end();
            console.log(err);
            return false;
        }
    };

    async userData(username){
        try{
            var connection = await this.connect();
            let result = await connection.query("SELECT * FROM publicinfo WHERE username = ?", [username]);
            await connection.end();
            result = result[0]
            if(result.length == 1){
                return {ok: true, id: result[0].id, puk: result[0].puk};
            }else{
                return {ok: false, error: "User does not exist"};
            }
        }catch(err){
            return {ok: false, error: "Can't connect to database"};
        }
    }

    async userDataById(id){
        try{
            var connection = await this.connect();
            let result = await connection.query("SELECT * FROM publicinfo WHERE id = ?", [id]);
            await connection.end();
            result = result[0]
            if(result.length == 1){
                return {ok: true, userName: result[0].username, puk: result[0].puk};
            }else{
                return {ok: false, error: "User does not exist"};
            }
        }catch(err){
     
            return {ok: false, error: "Can't connect to database"};
        }
    }
}

module.exports = DAO