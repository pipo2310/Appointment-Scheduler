"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const semanasSemestreController_1 = require("../controllers/semanasSemestreController");
class SemanasSemestreRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', semanasSemestreController_1.semanasSemestreController.getSemanas);
    }
}
const semanasSemestreRoutes = new SemanasSemestreRoutes();
exports.default = semanasSemestreRoutes.router;
