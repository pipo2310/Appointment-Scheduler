"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noAsistirACitaPublicaAjenaController_1 = require("../controllers/noAsistirACitaPublicaAjenaController");
class NoAsistirACitaPublicaAjenaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', noAsistirACitaPublicaAjenaController_1.noAsistirACitaPublicaAjenaController.index);
        this.router.post('/', noAsistirACitaPublicaAjenaController_1.noAsistirACitaPublicaAjenaController.noAsistir);
    }
}
const noAsistirACitaPublicaAjenaRoutes = new NoAsistirACitaPublicaAjenaRoutes();
exports.default = noAsistirACitaPublicaAjenaRoutes.router;
