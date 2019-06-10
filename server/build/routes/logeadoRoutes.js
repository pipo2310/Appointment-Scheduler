"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logeadoController_1 = require("../controllers/logeadoController");
class LogeadoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', logeadoController_1.logeadoController.index);
        this.router.post('/', logeadoController_1.logeadoController.conmutarLog);
    }
}
const logeadoRoutes = new LogeadoRoutes();
exports.default = logeadoRoutes.router;
