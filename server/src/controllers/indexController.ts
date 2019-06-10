import {Request, Response} from 'express';

class IndexController {
    
    public index(req:Request, res: Response){
        res.json({text: "Hola hola"})
    }
}

export const indexController = new IndexController();