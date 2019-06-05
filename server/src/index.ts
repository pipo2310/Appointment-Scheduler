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
        this.app.use('/',indexRoutes)
        this.app.use('/login',loginRoutes);
        this.app.use('/logeado', logeadoRoutes);
        this.app.use('/cursosEst', cursosEstRoutes);
        this.app.use('/profCurso', profCursoRoutes);
        this.app.use('/dispHoraProf', dispHoraProfRoutes);
        this.app.use('/diasConCitaEst', diasConCitasEstRouter);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () =>{
            console.log("server on port ", this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();