"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const programarCitaPropiaBloqueDispController_1 = require("../controllers/programarCitaPropiaBloqueDispController");
class ProgramarCitaPropiaBloqueDispRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', programarCitaPropiaBloqueDispController_1.programarCitaPropiaBloqueDispController.index);
        this.router.post('/', programarCitaPropiaBloqueDispController_1.programarCitaPropiaBloqueDispController.programarCita);
    }
}
const programarCitaPropiaBloqueDispRoutes = new ProgramarCitaPropiaBloqueDispRoutes();
exports.default = programarCitaPropiaBloqueDispRoutes.router;
