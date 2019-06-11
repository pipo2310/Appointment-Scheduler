import {Router} from 'express';

import {cancelarCitaPrivadaController} from '../controllers/cancelarCitaPrivadaController';

class CancelarCitaPrivadaRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', cancelarCitaPrivadaController.index)
        this.router.post('/', cancelarCitaPrivadaController.cancelarCita)
    }
}

const cancelarCitaPrivadaRoutes = new CancelarCitaPrivadaRoutes();
export default cancelarCitaPrivadaRoutes.router;