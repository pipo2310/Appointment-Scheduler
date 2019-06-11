"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DiasConCitasEstController_1 = require("../controllers/DiasConCitasEstController");
class DiasConCitasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', DiasConCitasEstController_1.diasConCitasEstController.getDiasConCita);
    }
}
const diasConCitasRoutes = new DiasConCitasRoutes();
exports.default = diasConCitasRoutes.router;
