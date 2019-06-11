"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class DiasConCitasEstController {
    getDiasConCita(req, res) {
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        const siglaCursoCitas = req.body.siglaCursoCitas;
        let sql = "CALL getDiasExisteCitaVistaEst('" + diaIni + "','" + diaFin + "', '" + cedProf + "', '" + cedEst + "', '" + siglaCursoCitas + "')";
        database_1.default.query(sql, (err, result) => {
            if (result) {
                res.send({ result: result[0] });
            }
            else {
                res.send({
                    "Error: ": err
                });
            }
        });
    }
}
exports.diasConCitasEstController = new DiasConCitasEstController();
