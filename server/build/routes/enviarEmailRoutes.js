"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manejarEventosCalendario_1 = require("../controllers/manejarEventosCalendario");
const express_1 = require("express");
class Send {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', manejarEventosCalendario_1.envEmail.sendEmail);
    }
}
const sendEma = new Send();
exports.default = sendEma.router;
