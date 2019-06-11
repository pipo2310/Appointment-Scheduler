"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noAsistirACitaPublicaPropiaController_1 = require("../controllers/noAsistirACitaPublicaPropiaController");
class NoAsistirACitaPublicaPropiaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', noAsistirACitaPublicaPropiaController_1.noAsistirACitaPublicaPropiaController.index);
        this.router.post('/', noAsistirACitaPublicaPropiaController_1.noAsistirACitaPublicaPropiaController.noAsistir);
    }
}
const noAsistirACitaPublicaPropiaRoutes = new NoAsistirACitaPublicaPropiaRoutes();
exports.default = noAsistirACitaPublicaPropiaRoutes.router;
