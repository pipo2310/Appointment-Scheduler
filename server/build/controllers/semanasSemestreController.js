"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class SemanasSemestreController {
    getSemanas(req, res) {
        let sql = "CALL getDiasSemanasSemestre()";
        database_1.default.query(sql, (err, result) => {
            if (result) {
                res.send(result[0]);
            }
            else {
                res.send(0);
            }
        });
    }
}
exports.semanasSemestreController = new SemanasSemestreController();
