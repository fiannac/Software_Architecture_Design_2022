import * as SQLite from 'expo-sqlite'

export default class LocalStorage {
    constructor() {
        this.db = SQLite.openDatabase('hermes.db');
    }

    async createTable(tableName, columns){
        const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${columns})`;
        const ok = new Promise((resolve, reject) => {
           this.db.transaction(tx => { tx.executeSql(query)},
           () => resolve(false),
           () => resolve(true))
       });
       return ok;  
    }

    async initDatabase(){
        const val1 = await this.createTable('authInfo','userName TEXT, id INTEGER, token TEXT, prk TEXT');    
        val2 = await this.createTable('users', 'id INTEGER, userName TEXT, puk TEXT');
        val3 = await this.createTable('chats', 'id INTEGER, idDestinatario INTEGER, idChat INTEGER');
        val4 = await this.createTable('messages', 'id INTEGER, idDestinatario INTEGER, text TEXT, timestamp INTEGER, idMess INTEGER');
        return val1 && val2 && val3 && val4;
    }

    async insertData(table, data){
        const query = `INSERT INTO ${table} VALUES(${data})`;
        const ok = new Promise((resolve, reject) => {
              this.db.transaction(tx => { tx.executeSql(query)},
                () => resolve(false),
                () => resolve(true))
        });
        return ok;
    }
    
    async insertAuthInfo(userName, id, token, prk){
        const res = await this.insertData('authInfo', `${userName}, ${id}, ${token}, ${prk}`);
        return res; 
    }

    async insertUser(id, userName, puk){
        const res = await this.insertData('users', `${id}, ${userName}, ${puk}`);
        return res;
    }

    async insertChat(id, idDestinatario, idChat){
        const res = await this.insertData('chats', `${id}, ${idDestinatario}, ${idChat}`);
        return res;
    }

    async insertMessage(id, idDestinatario, text, timestamp, idMess){
        const res = await this.insertData('messages', `${id}, ${idDestinatario}, ${text}, ${timestamp}, ${idMess}`);
        return res;
    }

    async getData(table, condition){
        const query = `SELECT * FROM ${table} WHERE ${condition}`;
        const val = new Promise((resolve, reject) => {
            this.db.transaction(tx => { 
                tx.executeSql(query), null, 
                (tx, { rows: { _array } }) => resolve(_array),
            (tx, error) => resolve(null)})
        });
        return val;
    }

    async getAuthInfo(){
        const val = await this.getData('authInfo', '1');
        return val;
    }

    async getMessagesByChat(idChat){
        const val = await this.getData('messages', `idChat = ${idChat}`);
        return val;
    }

    async getChatsByUser(id){
        const val = await this.getData('chats', `idDestinatario = ${id}`);
        return val;
    }

    async getUserById(id){
        const val = await this.getData('users', `id = ${id}`);
        return val;
    }

    async getUserByUserName(userName){
        const val = await this.getData('users', `userName = ${userName}`);
        return val;
    }

}
