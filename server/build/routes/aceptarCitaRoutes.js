"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aceptarCitaController_1 = require("../controllers/aceptarCitaController");
class AceptarCitaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', aceptarCitaController_1.aceptarCitaController.index);
        this.router.post('/', aceptarCitaController_1.aceptarCitaController.asistir);
    }
}
const aceptarCitaRoutes = new AceptarCitaRoutes();
exports.default = aceptarCitaRoutes.router;
