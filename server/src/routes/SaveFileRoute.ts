import {saveArc} from '../controllers/SaveFileController';
import {Router} from 'express';


class SaveFileRoute{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/', saveArc.saveArchivo)
      
    }
}

const SaveFil = new SaveFileRoute();
export default SaveFil.router; 