import {Request, Response} from 'express';
import pool from '../database';

class LogeadoController {
    
    public index(req:Request, res: Response){
        res.send("hello logeado")
    }

    public conmutarLog(req:Request, res:Response){
        const cedula = req.body.cedula;
        //console.log("credenciales en server: " +username + ", "+ password);
        pool.query("CALL conmutar('"+cedula+"')", (err:Error, result:any)=>{
            /***/
            /*if(err){
                res.status(403).send({
                    "Error": err
                });
            }*/
        })
    };
    
}

export const logeadoController = new LogeadoController();