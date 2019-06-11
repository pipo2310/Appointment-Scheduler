"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bloquesDispDiaController_1 = require("../controllers/bloquesDispDiaController");
class BloquesDispDiaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', bloquesDispDiaController_1.bloquesDispDiaController.index);
        this.router.post('/', bloquesDispDiaController_1.bloquesDispDiaController.getBloque);
    }
}
const bloquesDispDiaRoutes = new BloquesDispDiaRoutes();
exports.default = bloquesDispDiaRoutes.router;
