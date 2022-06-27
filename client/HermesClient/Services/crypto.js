import { NativeModules, Platform } from 'react-native'



export default class Crypto {
    encryptPrk(password, prk){
        return prk
    }
    decryptPrk(password, prk){
        return prk
    }
    hashPsw(psw){
        return psw
    }
    generateKeys(){
        const keys = {
            prk: 0,
            puk: 0
        }
        return keys
    }
    encryptMsg(msg, puk){
        return msg
    }
    decryptMsg(msg, prk){
        return msg
    }

}