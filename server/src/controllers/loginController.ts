import {Request, Response} from 'express';
import pool from '../database';

class LoginController {
    
    public index(req:Request, res: Response){
        res.send("hello login");
    }

    public login(req:Request, res:Response){
        const username = req.body.user;
        const password = req.body.pass;
        pool.query("SELECT loginUsuario('"+username+"','"+password+"') AS resultado", (err:Error, result:any)=>{
            if(result == 0){
                return res.json({error: -1});
            } else {
                if(result[0].resultado == 1){
                    let sql = "SELECT P.cedula, P.email, P.nombre, P.primerApellido, P.segundoApellido, (SELECT carne FROM ESTUDIANTE E WHERE E.cedula = P.cedula) AS 'carne', U.logueado, getRol(P.cedula) AS 'rol' FROM USUARIO U JOIN PERSONA P ON U.cedulaPersona = P.cedula WHERE U.nombreUsuario = '"+username+"'"
                    pool.query(sql, (err:Error, result1:any) => {
                        res.json(result1[0])
                    });
                } else{
                    res.json({
                        resultado: 0
                    });
                }
            }
            
        })
    };
    
}

export const loginController = new LoginController();