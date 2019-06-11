import {Router} from 'express';

import {noAsistirACitaPublicaAjenaController} from '../controllers/noAsistirACitaPublicaAjenaController';

class NoAsistirACitaPublicaAjenaRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', noAsistirACitaPublicaAjenaController.index)
        this.router.post('/', noAsistirACitaPublicaAjenaController.noAsistir)
    }
}

const noAsistirACitaPublicaAjenaRoutes = new NoAsistirACitaPublicaAjenaRoutes();
export default noAsistirACitaPublicaAjenaRoutes.router;