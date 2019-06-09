import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors'

import indexRoutes from './routes/indexRoutes';
import loginRoutes from './routes/loginRoutes';
import logeadoRoutes from './routes/logeadoRoutes';
import cursosEstRoutes from './routes/cursosEstRoutes'
import profCursoRoutes from './routes/profCursoRoutes'
import dispHoraProfRoutes from './routes/dispHoraProfRoutes';
import diasConCitasEstRouter from './routes/DiasConCitasEstRouter';
import citaCompletaProfRoutes from './routes/citaCompletaProfRoutes';
import citasUnDiaEst from './routes/citasUnDiaEstRoutes';
import bloquesDispDiaRoutes from './routes/bloquesDispDiaRoutes';
import semanasSemestre from './routes/semanasSemestreRoutes';
import insertCitaUnBloque from './routes/insertCitaUnBloqueRoutes';
import insertDispDiasSemanaRangoRoutes from './routes/insertDispDiasSemanaRangoRoutes';
import citasUnDiaProfRoutes from './routes/citasUnDiaProfRoutes';
import diasExisteCitaProfRoutes from './routes/diasExisteCitaProfRoutes'

class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'))
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );
            if (req.method === "OPTIONS") {
              res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
              return res.status(200).json({});
            }
            next();
          });
    }

    routes(): void {
        this.app.use('/',indexRoutes) //se usa
        this.app.use('/login',loginRoutes); //se usa
        this.app.use('/logeado', logeadoRoutes); //se usa
        this.app.use('/cursosEst', cursosEstRoutes); //se usa
        this.app.use('/profCurso', profCursoRoutes); //se usa
        this.app.use('/dispHoraProf', dispHoraProfRoutes); //se usa
        this.app.use('/diasConCitaEst', diasConCitasEstRouter); //
        this.app.use('/citasCompletasProf', citaCompletaProfRoutes);
        this.app.use('/citasUnDiaEst', citasUnDiaEst);
        this.app.use('/bloquesDispUnDia', bloquesDispDiaRoutes);
        this.app.use('/semanasSemestre', semanasSemestre);
        this.app.use('/insertCitaBloque', insertCitaUnBloque);
        this.app.use('/insertDispDiasRango', insertDispDiasSemanaRangoRoutes);
        this.app.use('/citasUnDiaProf', citasUnDiaProfRoutes);
        this.app.use('/diasConCitasProf', diasExisteCitaProfRoutes);

    }

    start(): void {
        this.app.listen(this.app.get('port'), () =>{
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