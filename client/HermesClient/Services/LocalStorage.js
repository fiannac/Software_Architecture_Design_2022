import * as SQLite from 'expo-sqlite'

export default class LocalStorage {
    constructor() {
        this.db = SQLite.openDatabase('hermes.db');
        this.initDatabase();
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
        const val1 = await this.createTable('authData','userName TEXT, valid INTEGER, psw TEXT');    
        val2 = await this.createTable('users', 'id INTEGER, userName TEXT, puk TEXT');
        val3 = await this.createTable('chats', 'id INTEGER, idDestinatario INTEGER, idChat INTEGER');
        val4 = await this.createTable('messages', 'id INTEGER, idDestinatario INTEGER, text TEXT, timestamp TEXT, idMess TEXT');
        return val1 && val2 && val3 && val4;
    }

    async insertData(table, data){
        const query = `INSERT INTO ${table} VALUES(${data})`;
        var ok = new Promise((resolve, reject) => {
              this.db.transaction(tx => { tx.executeSql(query)},
                () => resolve(false),
                () => resolve(true))
        });
        ok = await ok
        return ok;
    }
    
    async insertUser(id, userName, puk){
        const res = await this.insertData('users', `'${id}', '${userName}', '${puk}'`);
        return res;
    }
    async insertChat(id, idDestinatario, idChat){
        const res = await this.insertData('chats', `'${id}', '${idDestinatario}', '${idChat}'`);
        return res;
    }
    async insertMessage(id, idDestinatario, text, timestamp, idMess){
        const res = await this.insertData('messages', `'${id}', '${idDestinatario}', '${text}', '${timestamp}', '${idMess}'`);
        return res;
    }


    async getData(table, condition){
        const query = `SELECT * FROM ${table} WHERE ${condition}`;
        const val = new Promise((resolve, reject) => {
            this.db.transaction(tx => {
            tx.executeSql(query, null,
              (tx, { rows: { _array } }) => { resolve(_array)})}
          )})
        return val;
    }

    async getMessagesByChat(id, idDest){
        const val = await this.getData('messages', `id = '${id}' AND idDestinatario = '${idDest}'`);
        return val;
    }

    async getChatsByUser(id){
        const val = await this.getData('chats', `id = '${id}'`);
        return val;
    }

    async loadChats(id){
        const query = `SELECT t1.idDestinatario, t2.userName, t2.puk FROM chats t1 JOIN users t2 ON t1.idDestinatario = t2.id WHERE t1.id = '${id}'`;
        var val = new Promise((resolve, reject) => {
            this.db.transaction(tx => {
            tx.executeSql(query, null,
                (tx, { rows: { _array } }) => { resolve(_array)})}
            )})
        val = await val;
        return val;
    }

    async getUserById(id){
        const val = await this.getData('users', `id = '${id}'`);
        return val;
    }

    async getUserByUserName(userName){
        const val = await this.getData('users', `userName = '${userName}'`);
        return val;
    }

    async getAuthData(){
        const query = `SELECT * FROM authData`;
        const val = new Promise((resolve, reject) => {
            this.db.transaction(tx => {
            tx.executeSql(query, null,
              (tx, { rows: { _array } }) => { resolve(_array)})}
          )})
        return val;
    }

    async storeAuthData(userName, psw){
        console.log(userName, psw);
        const query = `INSERT INTO authData VALUES('${userName}', '1', '${psw}')`;
        var ok = new Promise((resolve, reject) => {
              this.db.transaction(tx => { tx.executeSql(query)},
                () => resolve(false),
                () => resolve(true))
        });
        ok = await ok
        console.log("store riuscita ", ok)
        return ok;        
    }

    async clearAuthData(){
        const query = `DELETE FROM authData`;
        var ok = new Promise((resolve, reject) => {
              this.db.transaction(tx => { tx.executeSql(query)},
                () => resolve(false),
                () => resolve(true))
        });
        ok = await ok
        return ok;
    }

    async deleteChat(id1, id2){
        const query = `DELETE FROM chats WHERE id = '${id1}' AND idDestinatario = '${id2}'`;
        var ok = new Promise((resolve, reject) => {
              this.db.transaction(tx => { tx.executeSql(query)},
                () => resolve(false),
                () => resolve(true))
        });
        ok = await ok
        return ok;
    }

    async deleteMsg(id1, id2){
        const query = `DELETE FROM messages WHERE id = '${id1}' AND idDestinatario = '${id2}'`;
        var ok = new Promise((resolve, reject) => {
              this.db.transaction(tx => { tx.executeSql(query)},
                () => resolve(false),
                () => resolve(true))
        });
        ok = await ok
        return ok;
    }
}
