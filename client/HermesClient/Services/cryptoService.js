import * as CryptoJS from "react-native-crypto-js";
var RSAKey = require('react-native-rsa');

export default class Crypto {
    constructor(){
        this.rsa = new RSAKey();
    }

    async encryptPrk(prk, password){ 
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(prk), password).toString();
        return ciphertext;
    }

    async decryptPrk(ciphertext, password){ 
        var bytes = CryptoJS.AES.decrypt(ciphertext, password);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }

    async hashPsw(psw){
        const hash = CryptoJS.MD5(psw).toString();
        return hash;
    }

    async generateKeys(){
        const bits = 512;
        const exponent = '10001'; 
        this.rsa.generate(bits, exponent);
        var puk = this.rsa.getPublicString(); 
        var prk = this.rsa.getPrivateString(); 
        return {puk,prk};
    }

    generateKey(){
        const key = "pippozzo";//uuid.v4();
        return key;
    }

    async encryptKey(key, puk){
        this.rsa.setPublicString(puk);
        return this.rsa.encrypt(key);
    }

    async decryptKey(key, prk){
        this.rsa.setPrivateString(prk);
        return this.rsa.decrypt(key);
    }

    async encryptMsg(msg, key){
        const ciphertext = await CryptoJS.AES.encrypt(msg, key).toString();;
        return ciphertext;
    }
    
    async decryptMsg(msg, key){
        const bytes = await CryptoJS.AES.decrypt(msg, key);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    }
}