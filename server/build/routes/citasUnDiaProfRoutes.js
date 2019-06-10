"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citasUnDiaProfController_1 = require("../controllers/citasUnDiaProfController");
class CitaUnDiaProfRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', citasUnDiaProfController_1.citasUnDiaProfController.getCita);
    }
}
const citaUnDiaProfRoutes = new CitaUnDiaProfRoutes();
exports.default = citaUnDiaProfRoutes.router;
