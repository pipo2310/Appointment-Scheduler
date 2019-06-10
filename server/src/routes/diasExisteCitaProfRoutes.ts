import {Router} from 'express';

import {diasExisteCitaProfController} from '../controllers/diasExisteCitaProfController';

class DiasExisteCitaProfRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', diasExisteCitaProfController.getDias)
    }
}

const diasExisteCitaProfRoutes = new DiasExisteCitaProfRoutes();
export default diasExisteCitaProfRoutes.router;