import { Request, Response } from 'express';
import pool from '../database';

class AsistirACitaAjenaController {

    public index(req: Request, res: Response) {
        res.send("hello asistir a cita ajena")
    }

    public asistir(req: Request, res: Response) {
        const dia = req.body.dia;
        const hora = req.body.hora;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        //console.log("credenciales en server: " +username + ", "+ password);
        pool.query("select asistirACitaPublicaAjena('" + dia + "', '" + hora + "','" + cedProf + "','" + cedEst + "') AS resultado", (err: Error, result: any) => {
            console.log(result);
            if (result) {
                res.send(result)
            } else {
                res.json({ error: err})
            }
        });
    }
}

export const asistirACitaAjenaController = new AsistirACitaAjenaController();