import { Request, Response } from 'express';
import pool from '../database';

class NoAsistirACitaPublicaAjenaController {

    public index(req: Request, res: Response) {
        res.send("hello NoAsistirACitaPublicaAjenaController")
    }

    public noAsistir(req: Request, res: Response) {
        const dia = req.body.dia;
        const hora = req.body.hora;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        //console.log("credenciales en server: " +username + ", "+ password);
        pool.query("select noAsistirACitaPublicaAjena('" + dia + "', '" + hora + "','" + cedProf + "','" + cedEst + "') AS resultado", (err: Error, result: any) => {
            console.log(result);
            if (result) {
                res.send(result)
            } else {
                res.json({ error: err})
            }
        });
    }
}

export const noAsistirACitaPublicaAjenaController = new NoAsistirACitaPublicaAjenaController();