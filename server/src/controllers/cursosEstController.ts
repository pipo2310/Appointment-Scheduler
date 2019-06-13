import {Request, Response} from 'express';
import pool from '../database';

class CursosEstController {
    
    public index(req:Request, res: Response){
        res.send("hello cursosEstController");
    }

    public getCursos(req:Request, res:Response){
        const cedula = req.body.cedula;
        let sql = "select C.sigla AS 'sigla', C.nombre AS 'nombre' from ESTUDIANTE join LLEVA L on ESTUDIANTE.cedula = L.cedEst join GRUPO G on L.siglaCurso = G.siglaCurso and L.numGrupo = G.numGrupo and L.semestre = G.semestre and L.anno = G.anno JOIN CURSO C on G.siglaCurso = C.sigla where ESTUDIANTE.cedula = '"+cedula+"'";
        pool.query(sql, (err:Error, result:any)=>{
            if(result){
                res.send(result)
            } else{
                res.send({null:0});
            }
        })
    };
    
}

export const cursosEstController = new CursosEstController();