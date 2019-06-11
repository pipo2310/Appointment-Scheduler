import {Router} from 'express';

import {noAsistirACitaPublicaPropiaController} from '../controllers/noAsistirACitaPublicaPropiaController';

class NoAsistirACitaPublicaPropiaRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', noAsistirACitaPublicaPropiaController.index)
        this.router.post('/', noAsistirACitaPublicaPropiaController.noAsistir)
    }
}

const noAsistirACitaPublicaPropiaRoutes = new NoAsistirACitaPublicaPropiaRoutes();
export default noAsistirACitaPublicaPropiaRoutes.router;