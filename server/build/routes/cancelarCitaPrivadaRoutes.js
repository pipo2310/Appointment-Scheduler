"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cancelarCitaPrivadaController_1 = require("../controllers/cancelarCitaPrivadaController");
class CancelarCitaPrivadaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', cancelarCitaPrivadaController_1.cancelarCitaPrivadaController.index);
        this.router.post('/', cancelarCitaPrivadaController_1.cancelarCitaPrivadaController.cancelarCita);
    }
}
const cancelarCitaPrivadaRoutes = new CancelarCitaPrivadaRoutes();
exports.default = cancelarCitaPrivadaRoutes.router;
