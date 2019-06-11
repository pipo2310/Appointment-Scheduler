import {Request, Response} from 'express';
import pool from '../database';

class GetDiasExisteDispVistaEstController {

    public index(req:Request, res: Response){
        res.send("hello GetDiasExisteDispVistaEstController");
    }
    
    public getDias(req:Request, res: Response){
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        const sigla = req.body.sigla;
        let sql = "call getDiasExisteDispVistaEst('"+diaIni+"', '"+diaFin+"', '"+cedProf+"', '"+cedEst+"', '"+sigla+"');";
        //console.log("info: ", cedula, diaIni, diaFin);
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
export const getDiasExisteDispVistaEstController = new GetDiasExisteDispVistaEstController();