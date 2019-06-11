import {Request, Response} from 'express';
import pool from '../database';

class CitasUnaSemProfController {
    public index(req:Request, res: Response){
        res.send("hello CitasUnaSemProfController");
    }

    public getCitas(req:Request, res: Response){
        const cedula = req.body.cedula;
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        let sql = "CALL getCitasUnaSemanaVistaProf('"+cedula+"', '"+diaIni+"','"+diaFin+"');";
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
export const citasUnaSemProfController = new CitasUnaSemProfController();