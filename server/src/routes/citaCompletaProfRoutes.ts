import {Router} from 'express';

import {citaCompletaProfController} from '../controllers/citaCompletaProfController';

class CitaCompletaProfRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', citaCompletaProfController.getCitaCompleta)
    }
}

const citaCompletaProfRoutes = new CitaCompletaProfRoutes();
export default citaCompletaProfRoutes.router;