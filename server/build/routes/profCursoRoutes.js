"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profCursoController_1 = require("../controllers/profCursoController");
class ProfCursoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', profCursoController_1.profCursoController.index);
        this.router.post('/', profCursoController_1.profCursoController.getProfes);
    }
}
const profCursoRoutes = new ProfCursoRoutes();
exports.default = profCursoRoutes.router;
