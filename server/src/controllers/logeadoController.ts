import {Request, Response} from 'express';
import pool from '../database';

class LogeadoController {
    
    public index(req:Request, res: Response){
        res.send("hello logeado")
    }

    public conmutarLog(req:Request, res:Response){
        const cedula = req.body.cedula;
        pool.query("CALL conmutar('"+cedula+"')", (err:Error, result:any)=>{
        })
    };
    
}

export const logeadoController = new LogeadoController();