"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProgramarCitaPropiaBloqueDispController {
    index(req, res) {
        res.send("hello programarCitaPropiaBloqueDispController");
    }
    programarCita(req, res) {
        const dia = req.body.dia;
        const hora = req.body.hora;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        const sigla = req.body.sigla;
        const descrCita = req.body.descrCita;
        const publica = req.body.publica;
        database_1.default.query("select programarCitaPropiaBloqueDisp('" + dia + "', '" + hora + "','" + cedProf + "','" + cedEst + "','" + sigla + "','" + descrCita + "','" + publica + "') AS resultado", (err, result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.json({ error: err });
            }
        });
    }
}
exports.programarCitaPropiaBloqueDispController = new ProgramarCitaPropiaBloqueDispController();
