"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GetTodosEventosUnDiaVistaEstController {
    index(req, res) {
        res.send("hello getTodosEventosUnDiaVistaEstController");
    }
    getEventos(req, res) {
        const dia = req.body.dia;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        const sigla = req.body.sigla;
        let sql = "call getTodosEventosUnDiaVistaEst('" + dia + "', '" + cedProf + "', '" + cedEst + "', '" + sigla + "');";
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
exports.getTodosEventosUnDiaVistaEstController = new GetTodosEventosUnDiaVistaEstController();
