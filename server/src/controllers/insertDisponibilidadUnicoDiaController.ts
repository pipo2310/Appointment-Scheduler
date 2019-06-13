import { Request, Response } from 'express';
import pool from '../database';

class InsertDisponibilidadUnicoDiaController {

    public index(req: Request, res: Response) {
        res.send("hello InsertDisponibilidadUnicoDiaController")
    }

    public insertDisp(req: Request, res: Response) {
        const cedProf = req.body.cedProf;
        const dia = req.body.dia;
        const horaIni = req.body.horaIni;
        const horaFin = req.body.horaFin;
        const lugar = req.body.lugar;
        pool.query("select insertDisponibilidadUnicoDia('" + cedProf + "', '" + dia + "','" + horaIni + "','" + horaFin + "','" + lugar + "') AS resultado", (err: Error, result: any) => {
            if (result) {
                res.send(result)
            } else {
                res.json({ error: err})
            }
        });
    }
}

export const insertDisponibilidadUnicoDiaController = new InsertDisponibilidadUnicoDiaController();