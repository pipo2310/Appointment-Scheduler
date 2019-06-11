"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getTodosEventosUnDiaVistaEstController_1 = require("../controllers/getTodosEventosUnDiaVistaEstController");
class GetTodosEventosUnDiaVistaEstRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', getTodosEventosUnDiaVistaEstController_1.getTodosEventosUnDiaVistaEstController.index);
        this.router.post('/', getTodosEventosUnDiaVistaEstController_1.getTodosEventosUnDiaVistaEstController.getEventos);
    }
}
const getTodosEventosUnDiaVistaEstRoutes = new GetTodosEventosUnDiaVistaEstRoutes();
exports.default = getTodosEventosUnDiaVistaEstRoutes.router;
