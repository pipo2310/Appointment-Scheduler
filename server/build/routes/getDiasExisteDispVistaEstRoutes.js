"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getDiasExisteDispVistaEstController_1 = require("../controllers/getDiasExisteDispVistaEstController");
class GetDiasExisteDispVistaEstRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', getDiasExisteDispVistaEstController_1.getDiasExisteDispVistaEstController.index);
        this.router.post('/', getDiasExisteDispVistaEstController_1.getDiasExisteDispVistaEstController.getDias);
    }
}
const getDiasExisteDispVistaEstRoutes = new GetDiasExisteDispVistaEstRoutes();
exports.default = getDiasExisteDispVistaEstRoutes.router;
