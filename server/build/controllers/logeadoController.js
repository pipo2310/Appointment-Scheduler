"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class LogeadoController {
    index(req, res) {
        res.send("hello logeado");
    }
    conmutarLog(req, res) {
        const cedula = req.body.cedula;
        database_1.default.query("CALL conmutar('" + cedula + "')", (err, result) => {
        });
    }
    ;
}
exports.logeadoController = new LogeadoController();
