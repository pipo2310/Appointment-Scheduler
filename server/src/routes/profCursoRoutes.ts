import {Router} from 'express';

import {profCursoController} from '../controllers/profCursoController';

class ProfCursoRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', profCursoController.index)
        this.router.post('/', profCursoController.getProfes)
    }
}

const profCursoRoutes = new ProfCursoRoutes();
export default profCursoRoutes.router;