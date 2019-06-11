"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const insertDisponibilidadUnicoDiaController_1 = require("../controllers/insertDisponibilidadUnicoDiaController");
class InsertDisponibilidadUnicoDiaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', insertDisponibilidadUnicoDiaController_1.insertDisponibilidadUnicoDiaController.index);
        this.router.post('/', insertDisponibilidadUnicoDiaController_1.insertDisponibilidadUnicoDiaController.insertDisp);
    }
}
const insertDisponibilidadUnicoDiaRoutes = new InsertDisponibilidadUnicoDiaRoutes();
exports.default = insertDisponibilidadUnicoDiaRoutes.router;
