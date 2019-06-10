"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citasUnDiaEstController_1 = require("../controllers/citasUnDiaEstController");
class CitaUnDiaEstRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', citasUnDiaEstController_1.citasUnDiaEstController.index);
        this.router.post('/', citasUnDiaEstController_1.citasUnDiaEstController.getCita);
    }
}
const citaUnDiaEstRoutes = new CitaUnDiaEstRoutes();
exports.default = citaUnDiaEstRoutes.router;
