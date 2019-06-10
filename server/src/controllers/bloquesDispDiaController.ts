import {Request, Response} from 'express';
import pool from '../database';

class BloquesDispDiaController {
    
    public index(req:Request, res: Response){
        res.send("hello BloquesDispDiaController");
    }

    public getBloque(req:Request, res:Response){
        const cedulaProf = req.body.cedulaProf;
        const fecha = req.body.fecha;
        let sql = "CALL getBloquesDisponiblesUnDia('"+cedulaProf+"','"+fecha+"')";
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
export const bloquesDispDiaController = new BloquesDispDiaController();