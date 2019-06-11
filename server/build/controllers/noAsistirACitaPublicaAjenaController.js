"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class NoAsistirACitaPublicaAjenaController {
    index(req, res) {
        res.send("hello NoAsistirACitaPublicaAjenaController");
    }
    noAsistir(req, res) {
        const dia = req.body.dia;
        const hora = req.body.hora;
        const cedProf = req.body.cedProf;
        const cedEst = req.body.cedEst;
        //console.log("credenciales en server: " +username + ", "+ password);
        database_1.default.query("select noAsistirACitaPublicaAjena('" + dia + "', '" + hora + "','" + cedProf + "','" + cedEst + "') AS resultado", (err, result) => {
            console.log(result);
            if (result) {
                res.send(result);
            }
            else {
                res.json({ error: err });
            }
        });
    }
}
exports.noAsistirACitaPublicaAjenaController = new NoAsistirACitaPublicaAjenaController();
