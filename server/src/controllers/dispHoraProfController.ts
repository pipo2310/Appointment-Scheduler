import {Request, Response} from 'express';
import pool from '../database';

class DispHoraProfController {
    
    public index(req:Request, res: Response){
        res.send("hello dispHoraProfController");
    }

    public getHorasDisp(req:Request, res:Response){
        const cedula = req.body.cedula;
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        let sql = "CALL getDiasExisteDispVistasProfEst('"+cedula+"','"+diaIni+"', '"+diaFin+"')";
        pool.query(sql, (err:Error, result:any)=>{
            if(result){
                res.send(result[0]);
            } else{
                res.send(0);
            }
        })
    };
}

export const dispHoraProfController = new DispHoraProfController();