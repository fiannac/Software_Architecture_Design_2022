import SQLite, {openDatabase} from 'react-native-sqlite-storage';

export default class LocalStorage {
    constructor() {
        this.db = SQLite.openDatabase({ name: 'hermes.db' });
    }

    async createTable(tableName, columns){
         // create table if not exists
        const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${columns})`;

        await this.db.executeSql(query);
    }

    async initDatabase(){
        await this.createTable('authInfo','userName TEXT PRIMARY KEY, id INTEGER PRIMARY KEY, token TEXT, prk TEXT');
        await this.createTable('users', 'id INTEGER PRIMARY KEY, userName TEXT, puk TEXT');
        await this.createTable('chats', 'id INTEGER, idDestinatario INTEGER, idChat INTEGER PRIMARY KEY, FOREIGN KEY (id) REFERENCES users(id), FOREIGN KEY (idDestinatario) REFERENCES users(id)');
        await this.createTable('messages', 'id INTEGER, idDestinatario INTEGER, text TEXT, timestamp INTEGER, idMess INTEGER PRIMARY KEY, REFERENCES chats(idChat)');
    }

    async insertAuthInfo(userName, id, token, prk){
        const query = `INSERT INTO authInfo(userName, id, token, prk) VALUES('${userName}', ${id}, '${token}', '${prk}')`;
        await this.db.executeSql(query);
    }

    async insertUser(id, userName, puk){
        const query = `INSERT INTO users(id, userName, puk) VALUES(${id}, '${userName}', '${puk}')`;
        await this.db.executeSql(query);
    }

    async insertChat(id, idDestinatario, idChat){
        const query = `INSERT INTO chats(id, idDestinatario, idChat) VALUES(${id}, ${idDestinatario}, ${idChat})`;
        await this.db.executeSql(query);
    }

    async insertMessage(id, idDestinatario, text, timestamp, idMess){
        const query = `INSERT INTO messages(id, idDestinatario, text, timestamp, idMess) VALUES(${id}, ${idDestinatario}, '${text}', ${timestamp}, ${idMess})`;
        await this.db.executeSql(query);
    }

    async getAuthInfo(){
        const query = `SELECT * FROM authInfo`;
        const result = await this.db.executeSql(query);
        return result;
    }

    async getMessagesByChat(idChat){
        const query = `SELECT * FROM messages WHERE idChat = ${idChat}`;
        const result = await this.db.executeSql(query);
        return result;
    }

    async getChatsByUser(id){
        const query = `SELECT * FROM chats WHERE id = ${id}`;
        const result = await this.db.executeSql(query);
        return result;
    }

    async getUserById(id){
        const query = `SELECT * FROM users WHERE id = ${id}`;
        const result = await this.db.executeSql(query);
        return result;
    }

    async getUserByUserName(userName){
        const query = `SELECT * FROM users WHERE userName = '${userName}'`;
        const result = await this.db.executeSql(query);
        return result;
    }


}
