import {Router} from 'express';

import {asistirACitaAjenaController} from '../controllers/asistirACitaAjenaController';

class AsistirACitaAjenaRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', asistirACitaAjenaController.index)
        this.router.post('/', asistirACitaAjenaController.asistir)
    }
}

const asistirACitaAjenaRoutes = new AsistirACitaAjenaRoutes();
export default asistirACitaAjenaRoutes.router;