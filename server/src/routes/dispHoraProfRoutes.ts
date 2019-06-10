import {Router} from 'express';

import {dispHoraProfController} from '../controllers/dispHoraProfController';

class DispHoraProfRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', dispHoraProfController.index)
        this.router.post('/', dispHoraProfController.getHorasDisp)
    }
}

const dispHoraProfRoutes = new DispHoraProfRoutes();
export default dispHoraProfRoutes.router;