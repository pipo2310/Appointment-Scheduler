import {Router} from 'express';

import {citasUnDiaProfController} from '../controllers/citasUnDiaProfController';

class CitaUnDiaProfRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', citasUnDiaProfController.getCita)
    }
}

const citaUnDiaProfRoutes = new CitaUnDiaProfRoutes();
export default citaUnDiaProfRoutes.router;