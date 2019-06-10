"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProfCursoController {
    index(req, res) {
        res.send("hello profCursoController");
    }
    getProfes(req, res) {
        const sigla = req.body.sigla;
        let sql = "SELECT DISTINCT P.cedula, P.email, P.nombre, P.primerApellido, P.segundoApellido FROM PERSONA P JOIN IMPARTE I ON P.cedula = I.cedProf WHERE I.siglaCurso = '" + sigla + "'";
        database_1.default.query(sql, (err, result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.send(0);
            }
        });
    }
    ;
}
exports.profCursoController = new ProfCursoController();
