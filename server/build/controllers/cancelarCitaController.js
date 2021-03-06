"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class CancelarCitaController {
    index(req, res) {
        res.send("hello cancelar cita");
    }
    asistir(req, res) {
        const dia = req.body.dia;
        const hora = req.body.hora;
        const cedProf = req.body.cedProf;
        database_1.default.query("select cancelarCita('" + dia + "', '" + hora + "','" + cedProf + "') AS resultado", (err, result) => {
            console.log(result);
            if (result) {
                res.send(result);
            }
            else {
                res.json({ error: err });
            }
        });
    }
}
exports.cancelarCitaController = new CancelarCitaController();
