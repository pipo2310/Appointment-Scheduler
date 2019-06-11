"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class InsertDispDiasSemanaRangoController {
    index(req, res) {
        res.send("hello InsertDispDiasSemanaRangoController");
    }
    setBloque(req, res) {
        const cedula = req.body.cedula;
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        const horaIni = req.body.horaIni;
        const horaFin = req.body.horaFin;
        const lugar = req.body.lugar;
        const lun = req.body.lun;
        const mar = req.body.diaIni;
        const mie = req.body.diaFin;
        const jue = req.body.horaIni;
        const vie = req.body.horaFin;
        const sab = req.body.lugar;
        let sql = "call insertDispDiasSemanaRangoFechas('" + cedula + "', '" + diaIni + "', '" + diaFin + "', '" + horaIni + "', '" + horaFin + "', '" + lugar + "', '" + lun + "', '" + mar + "', '" + mie + "', '" + jue + "', '" + vie + "', '" + sab + "')";
        database_1.default.query(sql, (err, result) => {
            if (result) {
                //res.send(result)
            }
            else {
                res.send({
                    "Error: ": err
                });
            }
        });
    }
}
exports.insertDispDiasSemanaRangoController = new InsertDispDiasSemanaRangoController();
