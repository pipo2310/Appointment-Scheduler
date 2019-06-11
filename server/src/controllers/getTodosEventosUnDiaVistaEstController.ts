import {Request, Response} from 'express';
import pool from '../database';

class GetTodosEventosUnDiaVistaEstController {

    public index(req:Request, res: Response){
        res.send("hello getTodosEventosUnDiaVistaEstController");
    }
    
    public getEventos(req:Request, res: Response){
        const dia = req.body.dia;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        const sigla = req.body.sigla;
        let sql = "call getTodosEventosUnDiaVistaEst('"+dia+"', '"+cedProf+"', '"+cedEst+"', '"+sigla+"');";
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
export const getTodosEventosUnDiaVistaEstController = new GetTodosEventosUnDiaVistaEstController();