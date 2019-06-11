"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asistirACitaAjenaController_1 = require("../controllers/asistirACitaAjenaController");
class AsistirACitaAjenaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', asistirACitaAjenaController_1.asistirACitaAjenaController.index);
        this.router.post('/', asistirACitaAjenaController_1.asistirACitaAjenaController.asistir);
    }
}
const asistirACitaAjenaRoutes = new AsistirACitaAjenaRoutes();
exports.default = asistirACitaAjenaRoutes.router;
