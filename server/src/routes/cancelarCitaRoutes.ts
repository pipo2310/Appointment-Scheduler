import {Router} from 'express';

import {cancelarCitaController} from '../controllers/cancelarCitaController';

class CancelarCitaRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', cancelarCitaController.index)
        this.router.post('/', cancelarCitaController.asistir)
    }
}

const cancelarCitaRoutes = new CancelarCitaRoutes();
export default cancelarCitaRoutes.router;