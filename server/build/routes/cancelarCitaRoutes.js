"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cancelarCitaController_1 = require("../controllers/cancelarCitaController");
class CancelarCitaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', cancelarCitaController_1.cancelarCitaController.index);
        this.router.post('/', cancelarCitaController_1.cancelarCitaController.asistir);
    }
}
const cancelarCitaRoutes = new CancelarCitaRoutes();
exports.default = cancelarCitaRoutes.router;
