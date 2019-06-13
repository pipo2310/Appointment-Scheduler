"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class CitasUnDiaEstController {
    index(req, res) {
        res.send("hello CitasUnDiaEstController");
    }
    getCita(req, res) {
        const cedulaEst = req.body.cedulaEst;
        const fecha = req.body.fecha;
        const cedulaProf = req.body.cedulaProf;
        const sigla = req.body.sigla;
        let sql = "CALL getTodosEventosUnDiaVistaEst('" + fecha + "', '" + cedulaProf + "', '" + cedulaEst + "', '" + sigla + "')";
        database_1.default.query(sql, (err, result) => {
            //console.log(result)
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
exports.citasUnDiaEstController = new CitasUnDiaEstController();
