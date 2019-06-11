"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class InsertCitaUnBloque {
    index(req, res) {
        res.send("hello InsertCitaUnBloque");
    }
    insertCita(req, res) {
        const cedulaEst = req.body.cedulaEst;
        const cedulaProf = req.body.cedulaProf;
        const curso = req.body.curso;
        const fecha = req.body.fecha;
        const hora = req.body.hora;
        const descrip = req.body.descrip;
        const pub = req.body.pub;
        let sql = "select insertCitaUnBloque('" + cedulaEst + "','" + cedulaProf + "','" + curso + "','" + fecha + "','" + hora + "', '" + descrip + "', " + pub + ") AS resultado;";
        database_1.default.query(sql, (err, result) => {
            console.log(cedulaEst, cedulaProf, curso, fecha, hora, descrip, pub);
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
exports.insertCitaUnBloque = new InsertCitaUnBloque();
