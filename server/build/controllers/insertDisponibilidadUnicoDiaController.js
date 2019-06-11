"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class InsertDisponibilidadUnicoDiaController {
    index(req, res) {
        res.send("hello InsertDisponibilidadUnicoDiaController");
    }
    insertDisp(req, res) {
        const cedProf = req.body.cedProf;
        const dia = req.body.dia;
        const horaIni = req.body.horaIni;
        const horaFin = req.body.horaFin;
        const lugar = req.body.lugar;
        //console.log("credenciales en server: " +username + ", "+ password);
        database_1.default.query("select insertDisponibilidadUnicoDia('" + cedProf + "', '" + dia + "','" + horaIni + "','" + horaFin + "','" + lugar + "') AS resultado", (err, result) => {
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
exports.insertDisponibilidadUnicoDiaController = new InsertDisponibilidadUnicoDiaController();
