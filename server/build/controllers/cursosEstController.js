"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class CursosEstController {
    index(req, res) {
        res.send("hello cursosEstController");
    }
    getCursos(req, res) {
        const cedula = req.body.cedula;
        let sql = "select C.sigla AS 'sigla', C.nombre AS 'nombre' from ESTUDIANTE join LLEVA L on ESTUDIANTE.cedula = L.cedEst join GRUPO G on L.siglaCurso = G.siglaCurso and L.numGrupo = G.numGrupo and L.semestre = G.semestre and L.anno = G.anno JOIN CURSO C on G.siglaCurso = C.sigla where ESTUDIANTE.cedula = '" + cedula + "'";
        database_1.default.query(sql, (err, result) => {
            if (result) {
                //console.log("CURSOS");
                //console.log(result)
                res.send(result);
            }
            else {
                res.send({ null: 0 });
            }
        });
    }
    ;
}
exports.cursosEstController = new CursosEstController();
