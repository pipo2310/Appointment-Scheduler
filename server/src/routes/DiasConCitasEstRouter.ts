import {Router} from 'express';

import {diasConCitasEstController} from '../controllers/DiasConCitasEstController';

class DiasConCitasRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/', diasConCitasEstController.getDiasConCita);
    }
}

const diasConCitasRoutes = new DiasConCitasRoutes();
export default diasConCitasRoutes.router;