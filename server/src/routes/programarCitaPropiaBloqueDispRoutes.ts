import {Router} from 'express';

import {programarCitaPropiaBloqueDispController} from '../controllers/programarCitaPropiaBloqueDispController';

class ProgramarCitaPropiaBloqueDispRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', programarCitaPropiaBloqueDispController.index)
        this.router.post('/', programarCitaPropiaBloqueDispController.programarCita)
    }
}

const programarCitaPropiaBloqueDispRoutes = new ProgramarCitaPropiaBloqueDispRoutes();
export default programarCitaPropiaBloqueDispRoutes.router;