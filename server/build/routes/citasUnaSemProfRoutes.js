"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citasUnaSemProfController_1 = require("../controllers/citasUnaSemProfController");
class CitasUnaSemProfRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', citasUnaSemProfController_1.citasUnaSemProfController.index);
        this.router.post('/', citasUnaSemProfController_1.citasUnaSemProfController.getCitas);
    }
}
const citasUnaSemProfRoutes = new CitasUnaSemProfRoutes();
exports.default = citasUnaSemProfRoutes.router;
