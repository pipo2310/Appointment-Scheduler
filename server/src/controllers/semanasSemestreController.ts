import {Request, Response} from 'express';
import pool from '../database';

class SemanasSemestreController {
    
    public getSemanas(req:Request, res: Response){
        let sql = "CALL getDiasSemanasSemestre()"
        pool.query(sql, (err:Error, result:any)=>{
            if(result){
                res.send(result[0])
            } else{
                res.send(0);
            }
        });
    }

    /*public getProfes(req:Request, res:Response){
        const sigla = req.body.sigla;
        let sql = "SELECT DISTINCT P.cedula, P.email, P.nombre, P.primerApellido, P.segundoApellido FROM PERSONA P JOIN IMPARTE I ON P.cedula = I.cedProf WHERE I.siglaCurso = '"+sigla+"'";
        pool.query(sql, (err:Error, result:any)=>{
            if(result){
                res.send(result)
            } else{
                res.send(0);
            }
        })
    };*/
    
}

export const semanasSemestreController = new SemanasSemestreController();