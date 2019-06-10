"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class CitasUnDiaProfController {
    getCita(req, res) {
        const cedula = req.body.cedula;
        const fecha = req.body.fecha;
        let sql = "CALL getCitasUnDiaVistaProf('" + cedula + "', '" + fecha + "');";
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
exports.citasUnDiaProfController = new CitasUnDiaProfController();
