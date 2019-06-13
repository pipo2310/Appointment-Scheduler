import {Request, Response} from 'express';
import pool from '../database';

class InsertCitaUnBloque {
    
    public index(req:Request, res: Response){
        res.send("hello InsertCitaUnBloque");
    }

    public insertCita(req:Request, res:Response){
        const cedulaEst = req.body.cedulaEst;
        const cedulaProf = req.body.cedulaProf;
        const curso = req.body.curso;
        const fecha = req.body.fecha;
        const hora = req.body.hora;
        const descrip = req.body.descrip;
        const pub = req.body.pub;
        let sql = "select insertCitaUnBloque('"+cedulaEst+"','"+cedulaProf+"','"+curso+"','"+fecha+"','"+hora+"', '"+descrip+"', "+pub+") AS resultado;"
        pool.query(sql, (err:Error, result:any) =>{
            if(result){
            res.send(result[0])
           } else{
                res.send({
                    "Error: ": err
                })
            } 
        });
    }
}
export const insertCitaUnBloque = new InsertCitaUnBloque();