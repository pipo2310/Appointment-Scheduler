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
        const key = req.body.key;
        console.log(key, " en servidor");
        let sql = "";
        if (key != null) {
            sql = "select insertCitaUnBloque('" + cedulaEst + "','" + cedulaProf + "','" + curso + "','" + fecha + "','" + hora + "', '" + descrip + "', " + pub + ", '" + key + "') AS resultado;";
        }
        else {
            sql = "select insertCitaUnBloque('" + cedulaEst + "','" + cedulaProf + "','" + curso + "','" + fecha + "','" + hora + "', '" + descrip + "', " + pub + ", null) AS resultado;";
        }
        database_1.default.query(sql, (err, result) => {
            if (result) {
                console.log(result);
                res.send(result[0]);
            }
            else {
                console.log(err);
                res.send({
                    "Error: ": err
                });
            }
        });
    }
}
exports.insertCitaUnBloque = new InsertCitaUnBloque();
