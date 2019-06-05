import {Request, Response} from 'express';
import pool from '../database';

class DiasConCitasEstController {
    
    public index(req:Request, res: Response){
        res.send("hello DiasConCitasEstController");
    }

    public getDiasConCita(req:Request, res:Response){
        const cedula = req.body.cedula;
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        let sql = "CALL getDiasExisteCitaVistaEst('"+cedula+"','"+diaIni+"', '"+diaFin+"')"
        pool.query(sql, (err:Error, result:any) =>{
            if(result){
            res.send({result:result[0]})
            } else{
                res.send({
                    "Error: ": err
                })
            }   
        });
    }
}
export const diasConCitasEstController = new DiasConCitasEstController();