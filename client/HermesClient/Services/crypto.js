import { NativeModules, Platform } from 'react-native'

var RSAKey = require('react-native-rsa');
import bcrypt from 'bcryptjs'
var CryptoJS = require("crypto-js");


export default class Crypto {
    constructor(){
        this.rsa = new RSAKey();
    }
    
    encryptPrk(prk, password){ // prk è ciò che viene cifrato con la password
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(prk), password).toString();
        return ciphertext;
    }
    decryptPrk(ciphertext, password){ //cifr
        var bytes = CryptoJS.AES.decrypt(ciphertext, password);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
    hashPsw(psw){
        const hash = CryptoJS.MD5(psw).toString();
        return hash;
    }

    generateKeys(){
        const bits = 512;
        const exponent = '10001'; // must be a string. This is hex string. decimal = 65537
        this.rsa.generate(bits, exponent);
        var puk = this.rsa.getPublicString(); // return json encoded string
        var prk = this.rsa.getPrivateString(); // return json encoded string
        return {puk,prk};
    }
    
    encryptMsg(msg, puk){ //se non decripyo messaggi buoni bugga
        //this.rsa.setPublicString(puk);
        //return this.rsa.encrypt(msg);
        return msg;
    }

    decryptMsg(msg, prk){
        //this.rsa.setPrivateString(prk);
        //return  this.rsa.decrypt(msg); // decrypted == originText
        return msg;
    }
}