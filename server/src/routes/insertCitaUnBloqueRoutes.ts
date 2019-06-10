import {Router} from 'express';

import {insertCitaUnBloque} from '../controllers/insertCitaUnBloqueController';

class InsertCitaUnBloqueRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', insertCitaUnBloque.index)
        this.router.post('/', insertCitaUnBloque.insertCita)
    }
}

const insertCitaUnBloqueRoutes = new InsertCitaUnBloqueRoutes();
export default insertCitaUnBloqueRoutes.router;