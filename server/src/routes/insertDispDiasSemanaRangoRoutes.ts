import {Router} from 'express';

import {insertDispDiasSemanaRangoController} from '../controllers/insertDispDiasSemanaRangoController';

class InsertDispDiasSemanaRangoRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', insertDispDiasSemanaRangoController.index)
        this.router.post('/', insertDispDiasSemanaRangoController.setBloque)
    }
}

const insertDispDiasSemanaRangoRoutes = new InsertDispDiasSemanaRangoRoutes();
export default insertDispDiasSemanaRangoRoutes.router;