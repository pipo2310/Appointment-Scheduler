import {Request, Response} from 'express';
import pool from '../database';

class DiasConCitasEstController {
    
    public getDiasConCita(req:Request, res:Response){
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        const siglaCursoCitas = req.body.siglaCursoCitas;
        let sql = "CALL getDiasExisteCitaVistaEst('"+diaIni+"','"+diaFin+"', '"+cedProf+"', '"+cedEst+"', '"+siglaCursoCitas+"')"
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