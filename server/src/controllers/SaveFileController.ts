import{Request,Response} from 'express';
//import{manejarEventosCalendario} from '../../build/controllers/manejarEventosCalendario'
import { Injectable } from '@angular/core';
import { stringify } from '@angular/core/src/util';
import pool from '../database';
 class saveArch {
  //composeOptions:email.ComposeOptions;
  constructor() {
  
   }

  saveArchivo(req:Request, res:Response){
    //getAsBinary();
    let file;
    file=req.body.formData.getAsBinary();
  /*  let sql = "insert into insertDispDiasSemanaRangoFechas('"+cedula+"', '"+diaIni+"', '"+diaFin+"', '"+horaIni+"', '"+horaFin+"', '"+lugar+"', '"+lun+"', '"+mar+"', '"+mie+"', '"+jue+"', '"+vie+"', '"+sab+"')";
    pool.query(sql, (err:Error, result:any) =>{
        if(result){
        res.send(result)
        } else{
            res.send({
                "Error: ": err
            })
        }   
    });*/

  }

 
}
export const saveArc = new saveArch();