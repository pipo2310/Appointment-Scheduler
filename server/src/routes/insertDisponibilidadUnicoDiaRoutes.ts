import {Router} from 'express';

import {insertDisponibilidadUnicoDiaController} from '../controllers/insertDisponibilidadUnicoDiaController';

class InsertDisponibilidadUnicoDiaRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', insertDisponibilidadUnicoDiaController.index)
        this.router.post('/', insertDisponibilidadUnicoDiaController.insertDisp)
    }
}

const insertDisponibilidadUnicoDiaRoutes = new InsertDisponibilidadUnicoDiaRoutes();
export default insertDisponibilidadUnicoDiaRoutes.router;