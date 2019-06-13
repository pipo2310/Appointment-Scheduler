"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diasExisteCitaProfController_1 = require("../controllers/diasExisteCitaProfController");
class DiasExisteCitaProfRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', diasExisteCitaProfController_1.diasExisteCitaProfController.getDias);
    }
}
const diasExisteCitaProfRoutes = new DiasExisteCitaProfRoutes();
exports.default = diasExisteCitaProfRoutes.router;
