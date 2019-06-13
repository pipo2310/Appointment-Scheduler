import {Router} from 'express';

import {citasUnaSemProfController} from '../controllers/citasUnaSemProfController'

class CitasUnaSemProfRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', citasUnaSemProfController.index);
        this.router.post('/', citasUnaSemProfController.getCitas);
    }
}

const citasUnaSemProfRoutes = new CitasUnaSemProfRoutes();
export default citasUnaSemProfRoutes.router;