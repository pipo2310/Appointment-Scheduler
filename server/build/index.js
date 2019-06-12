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
const citaCompletaProfRoutes_1 = __importDefault(require("./routes/citaCompletaProfRoutes"));
const citasUnDiaEstRoutes_1 = __importDefault(require("./routes/citasUnDiaEstRoutes"));
const bloquesDispDiaRoutes_1 = __importDefault(require("./routes/bloquesDispDiaRoutes"));
const semanasSemestreRoutes_1 = __importDefault(require("./routes/semanasSemestreRoutes"));
const insertCitaUnBloqueRoutes_1 = __importDefault(require("./routes/insertCitaUnBloqueRoutes"));
const insertDispDiasSemanaRangoRoutes_1 = __importDefault(require("./routes/insertDispDiasSemanaRangoRoutes"));
const citasUnDiaProfRoutes_1 = __importDefault(require("./routes/citasUnDiaProfRoutes"));
const diasExisteCitaProfRoutes_1 = __importDefault(require("./routes/diasExisteCitaProfRoutes"));
const programarCitaPropiaBloqueDispRoutes_1 = __importDefault(require("./routes/programarCitaPropiaBloqueDispRoutes"));
const asistirACitaAjenaRoutes_1 = __importDefault(require("./routes/asistirACitaAjenaRoutes"));
const cancelarCitaPrivadaRoutes_1 = __importDefault(require("./routes/cancelarCitaPrivadaRoutes"));
const noAsistirACitaPublicaPropiaRoutes_1 = __importDefault(require("./routes/noAsistirACitaPublicaPropiaRoutes"));
const noAsistirACitaPublicaAjenaRoutes_1 = __importDefault(require("./routes/noAsistirACitaPublicaAjenaRoutes"));
const insertDisponibilidadUnicoDiaRoutes_1 = __importDefault(require("./routes/insertDisponibilidadUnicoDiaRoutes"));
const getDiasExisteDispVistaEstRoutes_1 = __importDefault(require("./routes/getDiasExisteDispVistaEstRoutes"));
const getTodosEventosUnDiaVistaEstRoutes_1 = __importDefault(require("./routes/getTodosEventosUnDiaVistaEstRoutes"));
const citasUnaSemProfRoutes_1 = __importDefault(require("./routes/citasUnaSemProfRoutes"));
const aceptarCitaRoutes_1 = __importDefault(require("./routes/aceptarCitaRoutes"));
const cancelarCitaRoutes_1 = __importDefault(require("./routes/cancelarCitaRoutes"));
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
        this.app.use('/', indexRoutes_1.default); //se usa
        this.app.use('/login', loginRoutes_1.default); //se usa
        this.app.use('/logeado', logeadoRoutes_1.default); //se usa
        this.app.use('/cursosEst', cursosEstRoutes_1.default); //se usa
        this.app.use('/profCurso', profCursoRoutes_1.default); //se usa
        this.app.use('/dispHoraProf', dispHoraProfRoutes_1.default); //se usa
        this.app.use('/diasConCitaEst', DiasConCitasEstRouter_1.default); //
        this.app.use('/citasCompletasProf', citaCompletaProfRoutes_1.default);
        this.app.use('/citasUnDiaEst', citasUnDiaEstRoutes_1.default);
        this.app.use('/bloquesDispUnDia', bloquesDispDiaRoutes_1.default);
        this.app.use('/semanasSemestre', semanasSemestreRoutes_1.default);
        this.app.use('/insertCitaBloque', insertCitaUnBloqueRoutes_1.default);
        this.app.use('/insertDispDiasRango', insertDispDiasSemanaRangoRoutes_1.default);
        this.app.use('/citasUnDiaProf', citasUnDiaProfRoutes_1.default);
        this.app.use('/diasConCitasProf', diasExisteCitaProfRoutes_1.default);
        this.app.use('/programarCitaPropia', programarCitaPropiaBloqueDispRoutes_1.default);
        this.app.use('/asistirACitaAjena', asistirACitaAjenaRoutes_1.default);
        this.app.use('/cancelarCitaPrivada', cancelarCitaPrivadaRoutes_1.default);
        this.app.use('/noAsistirACitaPropia', noAsistirACitaPublicaPropiaRoutes_1.default);
        this.app.use('/noAsistirACitaPubAjena', noAsistirACitaPublicaAjenaRoutes_1.default);
        this.app.use('/insertDispUnDia', insertDisponibilidadUnicoDiaRoutes_1.default);
        this.app.use('/getDiasDispEst', getDiasExisteDispVistaEstRoutes_1.default);
        this.app.use('/getTodosEventosUnDiaEst', getTodosEventosUnDiaVistaEstRoutes_1.default);
        this.app.use('/citasUnaSemProf', citasUnaSemProfRoutes_1.default);
        this.app.use('/aceptarCitaProf', aceptarCitaRoutes_1.default);
        this.app.use('/rechazarCitaProf', cancelarCitaRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("server on port ", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
/**
 * conmutarLogeado [x]
 * getBloquesDisponiblesUnDia [x]
 * getCitaCompleta [x]
 * getCitasUnDiaVistaEst [x]
 * getCitasUnDiaVistaProf [x]
 * getDiasExisteCitaVistaEst [x]
 * getDiasExisteCitaVistaProfesor [x]
 * getDiasExisteDispVistasProfEst [x]
 * getDiasSemanasSemestre [x]
 * getEventosUnDiaVistaEst [x]
 * insertCitaUnBloque [x]
 * insertDispDiasSemanaRangoFechas [x]
 * insertDisponibilidadUnicoDia []
 * loginUsuario [x]
 */ 
