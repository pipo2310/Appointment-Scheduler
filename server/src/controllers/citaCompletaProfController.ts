import {Request, Response} from 'express';
import pool from '../database';

class CitaCompletaProfController {

    public getCitaCompleta(req:Request, res:Response){
        const cedulaEst = req.body.cedulaEst;
        const fecha = req.body.fecha;
        const hora = req.body.hora;
        const cedulaProf = req.body.cedulaProf;
        let sql = "CALL getCitaCompleta('"+cedulaEst+"', '"+fecha+"','"+hora+"' , '"+cedulaProf+"')";
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
export const citaCompletaProfController = new CitaCompletaProfController();