import { Request, Response } from 'express';
import pool from '../database';

class AceptarCitaController {

    public index(req: Request, res: Response) {
        res.send("hello aceptar cita")
    }

    public asistir(req: Request, res: Response) {
        const dia = req.body.dia;
        const hora = req.body.hora;
        const cedProf = req.body.cedProf;
        pool.query("select aceptarCita('" + dia + "', '" + hora + "','" + cedProf + "') AS resultado", (err: Error, result: any) => {
            console.log(result);
            if (result) {
                res.send(result)
            } else {
                res.json({ error: err})
            }
        });
    }
}

export const aceptarCitaController = new AceptarCitaController();