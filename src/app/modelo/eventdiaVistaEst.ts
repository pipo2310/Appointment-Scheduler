
export abstract class EventDiaVistaEst {
    "fecha": Date;
    "horaIni": string;
    "horaFin": string;    
}

export class DispProfeVistaEst extends EventDiaVistaEst {

}

export class DispCitaPublicaVistaEst extends EventDiaVistaEst {
    "descripcion": string;
    "propietario": string;
    "estado": string
}

export abstract class CitaVistaEst extends EventDiaVistaEst {
    "estado": string;
    "descripcion": string;
    "propietario": string;
}

export class CitaPrivadaVistaEst extends CitaVistaEst {
    
}

export class CitaPublicaPropiaEstVistaEst extends CitaVistaEst {
    
}

export class CitaPublicaAjenaEstVistaEst extends CitaVistaEst {
    
}