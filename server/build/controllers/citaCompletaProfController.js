"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class CitaCompletaProfController {
    index(req, res) {
        res.send("hello CitaCompletaProfController");
    }
    getCitaCompleta(req, res) {
        const cedulaEst = req.body.cedulaEst;
        const fecha = req.body.fecha;
        const hora = req.body.hora;
        const cedulaProf = req.body.cedulaProf;
        const sigla = req.body.sigla;
        let sql = "CALL getCitaCompleta('" + cedulaEst + "', '" + fecha + "','" + hora + "' , '" + cedulaProf + "', '" + sigla + "')";
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
exports.citaCompletaProfController = new CitaCompletaProfController();
