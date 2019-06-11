"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citaCompletaProfController_1 = require("../controllers/citaCompletaProfController");
class CitaCompletaProfRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', citaCompletaProfController_1.citaCompletaProfController.getCitaCompleta);
    }
}
const citaCompletaProfRoutes = new CitaCompletaProfRoutes();
exports.default = citaCompletaProfRoutes.router;
