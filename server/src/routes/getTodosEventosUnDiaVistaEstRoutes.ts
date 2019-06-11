import {Router} from 'express';

import {getTodosEventosUnDiaVistaEstController} from '../controllers/getTodosEventosUnDiaVistaEstController';

class GetTodosEventosUnDiaVistaEstRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', getTodosEventosUnDiaVistaEstController.index)
        this.router.post('/', getTodosEventosUnDiaVistaEstController.getEventos)
    }
}

const getTodosEventosUnDiaVistaEstRoutes = new GetTodosEventosUnDiaVistaEstRoutes();
export default getTodosEventosUnDiaVistaEstRoutes.router;