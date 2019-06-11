import {Router} from 'express';

import {getDiasExisteDispVistaEstController} from '../controllers/getDiasExisteDispVistaEstController';

class GetDiasExisteDispVistaEstRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', getDiasExisteDispVistaEstController.index)
        this.router.post('/', getDiasExisteDispVistaEstController.getDias)
    }
}

const getDiasExisteDispVistaEstRoutes = new GetDiasExisteDispVistaEstRoutes();
export default getDiasExisteDispVistaEstRoutes.router;