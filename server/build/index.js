"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const logeadoRoutes_1 = __importDefault(require("./routes/logeadoRoutes"));
const cursosEstRoutes_1 = __importDefault(require("./routes/cursosEstRoutes"));
const profCursoRoutes_1 = __importDefault(require("./routes/profCursoRoutes"));
const dispHoraProfRoutes_1 = __importDefault(require("./routes/dispHoraProfRoutes"));
const DiasConCitasEstRouter_1 = __importDefault(require("./routes/DiasConCitasEstRouter"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            if (req.method === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
                return res.status(200).json({});
            }
            next();
        });
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/login', loginRoutes_1.default);
        this.app.use('/logeado', logeadoRoutes_1.default);
        this.app.use('/cursosEst', cursosEstRoutes_1.default);
        this.app.use('/profCurso', profCursoRoutes_1.default);
        this.app.use('/dispHoraProf', dispHoraProfRoutes_1.default);
        this.app.use('/diasConCitaEst', DiasConCitasEstRouter_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("server on port ", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
