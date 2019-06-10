import {Router} from 'express';

import {cursosEstController} from '../controllers/cursosEstController';

class CursosEstRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', cursosEstController.index)
        this.router.post('/', cursosEstController.getCursos)
    }
}

const cursosEstRoutes = new CursosEstRoutes();
export default cursosEstRoutes.router;