"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    index(req, res) {
        database_1.default.query("SELECT * FROM USUARIO");
        res.send('GAMES');
    }
    create(req, res) {
        const username = req.body.user;
        const password = req.body.pass;
        console.log("credenciales en server: " + username + ", " + password);
        database_1.default.query("SELECT loginUsuario('" + username + "','" + password + "') AS resultado", (err, result) => {
            if (result[0].resultado == 1) {
                console.log("LOGEADO");
                let sql = "SELECT P.cedula, P.email, P.nombre, P.primerApellido, P.segundoApellido, (SELECT carne FROM ESTUDIANTE E WHERE E.cedula = P.cedula) AS 'carne', U.logueado, getRol(P.cedula) AS 'rol' FROM USUARIO U JOIN PERSONA P ON U.cedulaPersona = P.cedula WHERE U.nombreUsuario = '" + username + "'";
                database_1.default.query(sql, (err, result1) => {
                    res.json(result1[0]);
                    console.log(result1[0]);
                });
            }
            else {
                res.json({
                    resultado: 0
                });
            }
        });
    }
    ;
}
exports.gamesController = new GamesController();
