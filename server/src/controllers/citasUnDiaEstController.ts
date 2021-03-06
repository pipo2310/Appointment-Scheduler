import {Request, Response} from 'express';
import pool from '../database';

class CitasUnDiaEstController {
    
    public index(req:Request, res: Response){
        res.send("hello CitasUnDiaEstController");
    }

    public getCita(req:Request, res:Response){
        const cedulaEst = req.body.cedulaEst;
        const fecha = req.body.fecha;
        const cedulaProf = req.body.cedulaProf;
        const sigla = req.body.sigla;
        let sql = "CALL getTodosEventosUnDiaVistaEst('"+fecha+"', '"+cedulaProf+"', '"+cedulaEst+"', '"+sigla+"')";
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
export const citasUnDiaEstController = new CitasUnDiaEstController();