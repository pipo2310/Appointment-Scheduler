"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const pool = promise_mysql_1.default.createPool({
    host: "consultasdb-instance.cqyg0zdcdpb3.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "user-consultas",
    password: "Inge1Proyecto",
    database: "consultasdb"
});
pool.getConnection()
    .then(connection => {
    pool.releaseConnection(connection);
    console.log('DB ESTÁ CONECTADA');
});
exports.default = pool;
