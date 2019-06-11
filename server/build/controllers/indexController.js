"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({ text: "Hola hola" });
    }
}
exports.indexController = new IndexController();
