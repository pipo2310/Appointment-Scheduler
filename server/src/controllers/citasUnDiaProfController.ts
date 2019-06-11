import {Request, Response} from 'express';
import pool from '../database';

class CitasUnDiaProfController {
    
    public getCita(req:Request, res: Response){
        const cedula = req.body.cedula;
        const fecha = req.body.fecha;
        let sql = "CALL getCitasUnDiaVistaProf('"+cedula+"', '"+fecha+"');";
        pool.query(sql, (err:Error, result:any) =>{
            if(result){
            res.send(result[0]);
            } else{
                res.send({
                    "Error: ": err
                })
            }   
        });
    }
}
export const citasUnDiaProfController = new CitasUnDiaProfController();