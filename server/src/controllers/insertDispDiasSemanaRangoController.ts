import {Request, Response} from 'express';
import pool from '../database';

class InsertDispDiasSemanaRangoController {
    
    public index(req:Request, res: Response){
        res.send("hello InsertDispDiasSemanaRangoController");
    }

    public setBloque(req:Request, res:Response){
        const cedula = req.body.cedula;
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        const horaIni = req.body.horaIni;
        const horaFin = req.body.horaFin;
        const lugar = req.body.lugar;
        const lun = req.body.lun;
        const mar = req.body.diaIni;
        const mie = req.body.diaFin;
        const jue = req.body.horaIni;
        const vie = req.body.horaFin;
        const sab = req.body.lugar;
        let sql = "call insertDispDiasSemanaRangoFechas('"+cedula+"', '"+diaIni+"', '"+diaFin+"', '"+horaIni+"', '"+horaFin+"', '"+lugar+"', '"+lun+"', '"+mar+"', '"+mie+"', '"+jue+"', '"+vie+"', '"+sab+"')";
        pool.query(sql, (err:Error, result:any) =>{
            if(result){
            res.send(result)
            } else{
                res.send({
                    "Error: ": err
                })
            }   
        });
    }
}
export const insertDispDiasSemanaRangoController = new InsertDispDiasSemanaRangoController();