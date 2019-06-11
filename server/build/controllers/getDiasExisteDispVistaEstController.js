"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GetDiasExisteDispVistaEstController {
    index(req, res) {
        res.send("hello GetDiasExisteDispVistaEstController");
    }
    getDias(req, res) {
        const diaIni = req.body.diaIni;
        const diaFin = req.body.diaFin;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        const sigla = req.body.sigla;
        let sql = "call getDiasExisteDispVistaEst('" + diaIni + "', '" + diaFin + "', '" + cedProf + "', '" + cedEst + "', '" + sigla + "');";
        //console.log("info: ", cedula, diaIni, diaFin);
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
exports.getDiasExisteDispVistaEstController = new GetDiasExisteDispVistaEstController();
