import {Router} from 'express';

import {bloquesDispDiaController} from '../controllers/bloquesDispDiaController';

class BloquesDispDiaRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', bloquesDispDiaController.index)
        this.router.post('/', bloquesDispDiaController.getBloque)
    }
}

const bloquesDispDiaRoutes = new BloquesDispDiaRoutes();
export default bloquesDispDiaRoutes.router;