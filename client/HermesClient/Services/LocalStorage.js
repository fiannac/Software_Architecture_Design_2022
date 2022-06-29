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

    async insertAuthInfo(userName, id, token, prk){
        const query = `INSERT INTO authInfo(userName, id, token, prk) VALUES('${userName}', ${id}, '${token}', '${prk}')`;
        this.db.transaction(tx => {tx.executeSql(query)},
        (tx, error) => console.log(error, 'error'),
        () => console.log('insert auth info'));
    }

    async insertUser(id, userName, puk){
        const query = `INSERT INTO users(id, userName, puk) VALUES(${id}, '${userName}', '${puk}')`;
        this.db.transaction(tx => {tx.executeSql(query)})

    }

    async insertChat(id, idDestinatario, idChat){
        const query = `INSERT INTO chats(id, idDestinatario, idChat) VALUES(${id}, ${idDestinatario}, ${idChat})`;
        this.db.transaction(tx => {tx.executeSql(query)})
    }

    async insertMessage(id, idDestinatario, text, timestamp, idMess){
        const query = `INSERT INTO messages(id, idDestinatario, text, timestamp, idMess) VALUES(${id}, ${idDestinatario}, '${text}', ${timestamp}, ${idMess})`;
        this.db.transaction(tx => {tx.executeSql(query)})
    }

    async getAuthInfo(){
        const query = `SELECT * FROM authInfo`;
        //const result = this.db.transaction(tx => {tx.executeSql(query, null, (tx, results) => {console.log(results)})})

        this.db.transaction(tx => {
            tx.executeSql(query, null,
              (txObj, { rows: { _array } }) => console.log(_array ) ,
              // failure callback which sends two things Transaction object and Error
              (txObj, error) => console.log('Error ', error)
              ) // end executeSQL
          }) // end transaction        return result;
    }

    async getMessagesByChat(idChat){
        const query = `SELECT * FROM messages WHERE idChat = ${idChat}`;
        const result = this.db.transaction(tx => {tx.executeSql(query)})

        return result;
    }

    async getChatsByUser(id){
        const query = `SELECT * FROM chats WHERE id = ${id}`;
        const result = this.db.transaction(tx => {tx.executeSql(query)})

        return result;
    }

    async getUserById(id){
        const query = `SELECT * FROM users WHERE id = ${id}`;
        const result = this.db.transaction(tx => {tx.executeSql(query)})

        return result;
    }

    async getUserByUserName(userName){
        const query = `SELECT * FROM users WHERE userName = '${userName}'`;
        const result = this.db.transaction(tx => {tx.executeSql(query)})

        return result;
    }


}
