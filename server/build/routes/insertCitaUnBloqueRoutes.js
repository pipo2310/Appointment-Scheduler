"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const insertCitaUnBloqueController_1 = require("../controllers/insertCitaUnBloqueController");
class InsertCitaUnBloqueRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', insertCitaUnBloqueController_1.insertCitaUnBloque.index);
        this.router.post('/', insertCitaUnBloqueController_1.insertCitaUnBloque.insertCita);
    }
}
const insertCitaUnBloqueRoutes = new InsertCitaUnBloqueRoutes();
exports.default = insertCitaUnBloqueRoutes.router;
