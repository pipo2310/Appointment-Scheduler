"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dispHoraProfController_1 = require("../controllers/dispHoraProfController");
class DispHoraProfRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', dispHoraProfController_1.dispHoraProfController.index);
        this.router.post('/', dispHoraProfController_1.dispHoraProfController.getHorasDisp);
    }
}
const dispHoraProfRoutes = new DispHoraProfRoutes();
exports.default = dispHoraProfRoutes.router;
