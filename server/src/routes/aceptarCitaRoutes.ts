import {Router} from 'express';

import {aceptarCitaController} from '../controllers/aceptarCitaController';

class AceptarCitaRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', aceptarCitaController.index)
        this.router.post('/', aceptarCitaController.asistir)
    }
}

const aceptarCitaRoutes = new AceptarCitaRoutes();
export default aceptarCitaRoutes.router;