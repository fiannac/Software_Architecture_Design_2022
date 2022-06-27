export default class RegistrationController {
    constructor(network, loggedUser) {
        this.network = network
    }

    registerUser(user, email, psw){  
        const pubk = 0;
        const prvk = 0;
        //cripta la prvk con la password
        //hasha la psw
        
        if(this.network.registerRequest(user, email, psw, pubk, prvk)){
            return true;
            //torna a login page
        } else {
            //mostra errore a video?!
        }

    }
    
}