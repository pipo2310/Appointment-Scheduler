"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const insertDispDiasSemanaRangoController_1 = require("../controllers/insertDispDiasSemanaRangoController");
class InsertDispDiasSemanaRangoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', insertDispDiasSemanaRangoController_1.insertDispDiasSemanaRangoController.index);
        this.router.post('/', insertDispDiasSemanaRangoController_1.insertDispDiasSemanaRangoController.setBloque);
    }
}
const insertDispDiasSemanaRangoRoutes = new InsertDispDiasSemanaRangoRoutes();
exports.default = insertDispDiasSemanaRangoRoutes.router;
