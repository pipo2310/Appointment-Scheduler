"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class DiasExisteCitaProfController {
    getDias(req, res) {
        const cedula = req.body.cedula;
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        let sql = "call getDiasExisteCitaVistaProfesor('" + cedula + "', '" + diaIni + "', '" + diaFin + "');";
        console.log("info: ", cedula, diaIni, diaFin);
        database_1.default.query(sql, (err, result) => {
            if (result) {
                res.send(result[0]);
            }
            else {
                res.send({
                    "Error: ": err
                });
            }
        });
    }
}
exports.diasExisteCitaProfController = new DiasExisteCitaProfController();
