"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cursosEstController_1 = require("../controllers/cursosEstController");
class CursosEstRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', cursosEstController_1.cursosEstController.index);
        this.router.post('/', cursosEstController_1.cursosEstController.getCursos);
    }
}
const cursosEstRoutes = new CursosEstRoutes();
exports.default = cursosEstRoutes.router;
