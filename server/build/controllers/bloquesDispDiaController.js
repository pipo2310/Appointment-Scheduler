"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class BloquesDispDiaController {
    index(req, res) {
        res.send("hello BloquesDispDiaController");
    }
    getBloque(req, res) {
        const cedulaProf = req.body.cedulaProf;
        const fecha = req.body.fecha;
        let sql = "CALL getBloquesDisponiblesUnDia('" + cedulaProf + "','" + fecha + "')";
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
exports.bloquesDispDiaController = new BloquesDispDiaController();
