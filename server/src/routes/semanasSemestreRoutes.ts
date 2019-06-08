import {Router} from 'express';

import {semanasSemestreController} from '../controllers/semanasSemestreController';

class SemanasSemestreRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', semanasSemestreController.getSemanas)
    }
}

const semanasSemestreRoutes = new SemanasSemestreRoutes();
export default semanasSemestreRoutes.router;