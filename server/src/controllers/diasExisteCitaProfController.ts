import {Request, Response} from 'express';
import pool from '../database';

class DiasExisteCitaProfController {
    
    public getDias(req:Request, res: Response){
        const cedula = req.body.cedula;
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        let sql = "call getDiasExisteCitaVistaProfesor('"+cedula+"', '"+diaIni+"', '"+diaFin+"');";
        console.log("info: ", cedula, diaIni, diaFin);
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
export const diasExisteCitaProfController = new DiasExisteCitaProfController();