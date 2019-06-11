import {Router} from 'express';

import { logeadoController } from '../controllers/logeadoController';

class LogeadoRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', logeadoController.index)
        this.router.post('/', logeadoController.conmutarLog)
    }
}

const logeadoRoutes = new LogeadoRoutes();
export default logeadoRoutes.router;