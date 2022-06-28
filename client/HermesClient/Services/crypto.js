import { NativeModules, Platform } from 'react-native'


var RSAKey = require('react-native-rsa');
import bcrypt from 'bcryptjs'
var CryptoJS = require("crypto-js");


export default class Crypto {

    constructor(){
        this.rsa = new RSAKey();
        this.salt=bcrypt.genSaltSync(10)
    }
    
    encryptPrk(prk, password){ // prk è ciò che viene cifrato con la password
    
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(password), prk).toString();
        return ciphertext;
    }
    decryptPrk(ciphertext, password){ //cifr

        var bytes = CryptoJS.AES.decrypt(ciphertext, password);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }

    

    hashPsw(psw){

        const hashedPassword = bcrypt.hashSync(psw, this.salt)
        return hashedPassword;
        return psw
    }
    
    generateKeys(){
    const bits = 1024;
    const exponent = '10001'; // must be a string. This is hex string. decimal = 65537
    this.rsa.generate(bits, exponent);
    var publicKey = this.rsa.getPublicString(); // return json encoded string
    var privateKey = this.rsa.getPrivateString(); // return json encoded string
    return {publicKey,privateKey};
    }

    encryptMsg(msg, puk){
    this.rsa.setPublicString(puk);
    return this.rsa.encrypt(msg);
    }

    decryptMsg(msg, prk){
    this.rsa.setPrivateString(prk);
    return  this.rsa.decrypt(msg); // decrypted == originText
    }



}