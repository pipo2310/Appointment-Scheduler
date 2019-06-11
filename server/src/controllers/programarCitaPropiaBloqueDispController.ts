import { Request, Response } from 'express';
import pool from '../database';

class ProgramarCitaPropiaBloqueDispController {

    public index(req: Request, res: Response) {
        res.send("hello programarCitaPropiaBloqueDispController")
    }

    public programarCita(req: Request, res: Response) {
        const dia = req.body.dia;
        const hora = req.body.hora;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        const sigla = req.body.sigla;
        const descrCita = req.body.descrCita;
        const publica = req.body.publica;
        //console.log("credenciales en server: " +username + ", "+ password);
        pool.query("select programarCitaPropiaBloqueDisp('" + dia + "', '" + hora + "','" + cedProf + "','" + cedEst + "','" + sigla + "','" + descrCita + "','" + publica + "') AS resultado", (err: Error, result: any) => {
            console.log(result);
            if (result) {
                res.send(result)
            } else {
                res.json({ error: err})
            }
        });
    }
}

export const programarCitaPropiaBloqueDispController = new ProgramarCitaPropiaBloqueDispController();