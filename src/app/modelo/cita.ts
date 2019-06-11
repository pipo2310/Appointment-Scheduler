import { Profesor } from './profesor';
import { Fecha } from './fecha';
import { Estudiante } from './estudiante';

export class Cita {
    "fecha": Fecha;
    "hora": string;
    "profesor": Profesor;
    "estudiante": Estudiante;
    "estado": string;
    "publica": boolean;
    "contador": number;
}