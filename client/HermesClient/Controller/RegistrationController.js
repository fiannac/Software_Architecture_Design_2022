export default class RegistrationController {
    constructor(network, crypto) {
        this.network = network
        this.crypto = crypto
    }

    async registerUser(user, email, psw){  
        const keys = await this.crypto.generateKeys(); // generazione chiave pubblica e privata per RSA
        const prk = keys.prk;
        const puk = keys.puk;

        const Cprk = await this.crypto.encryptPrk(prk, psw) // privata cifrata con la password in chiaro
        const Hpsw = await this.crypto.hashPsw(psw) //hashing della password con MD5
        const res = await this.network.registerRequest(user, email, Hpsw, puk, Cprk)

        if(res == true){
            return true;
        } else {
            return false;
        }
    }
    
}