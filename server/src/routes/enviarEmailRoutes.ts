import {envEmail} from '../controllers/manejarEventosCalendario';
import {Router} from 'express';


class Send{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/', envEmail.sendEmail)
      
    }
}

const sendEma = new Send();
export default sendEma.router; 