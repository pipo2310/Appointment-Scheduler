"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class AsistirACitaAjenaController {
    index(req, res) {
        res.send("hello asistir a cita ajena");
    }
    asistir(req, res) {
        const dia = req.body.dia;
        const hora = req.body.hora;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        database_1.default.query("select asistirACitaPublicaAjena('" + dia + "', '" + hora + "','" + cedProf + "','" + cedEst + "') AS resultado", (err, result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.json({ error: err });
            }
        });
    }
}
exports.asistirACitaAjenaController = new AsistirACitaAjenaController();
