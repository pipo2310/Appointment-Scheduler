import {Router} from 'express';

import {citasUnDiaEstController} from '../controllers/citasUnDiaEstController';

class CitaUnDiaEstRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', citasUnDiaEstController.index)
        this.router.post('/', citasUnDiaEstController.getCita)
    }
}

const citaUnDiaEstRoutes = new CitaUnDiaEstRoutes();
export default citaUnDiaEstRoutes.router;