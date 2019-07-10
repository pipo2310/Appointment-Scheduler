
/*import{Request,Response} from 'express';
import{manejarEventosCalendario} from '../../build/controllers/manejarEventosCalendario'
class EnviarEmail{

    public sendEmail(req:Request,res:Response){
        console.log("basura");


    }
 
}
export const envEmail = new EnviarEmail();*/
import{Request,Response} from 'express';
//import{manejarEventosCalendario} from '../../build/controllers/manejarEventosCalendario'
import { Injectable } from '@angular/core';
import * as nodemailer from "nodemailer";
import { stringify } from '@angular/core/src/util';

 class EnviarEmail {
  //composeOptions:email.ComposeOptions;
  constructor() {
  
   }

  sendEmail(req:Request, res:Response){

    //:string,correo:string,fecha:string,nombreProfesor:string,hora:string
   let cadena:string;
   cadena=req.body.nombre+' en esta fecha y hora '+req.body.fecha+' '+req.body.hora+ ' con el profesor '+req.body.nombreProfesor
   let mailOptions = {
      from: 'ISpruebacalendar@gmail.com',
      to: req.body.correo,
      subject:'Detalles de cita',
      html:cadena
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 995,
    secure: true,
    service: 'Gmail',
    auth: {
        user:'ISpruebacalendar@gmail.com' ,
        pass: 'Inge1Proyecto'
    },
    tls: { rejectUnauthorized: false }
});

 
transporter.sendMail(mailOptions, function (error, info) {
    console.log("ENTRE")
  if (error) {
    console.log(" NO funciono",error)
      return error;
  } else {
      console.log("funciono")
      return "E-mail enviado com sucesso!";
  }
});

  }
}
export const envEmail = new EnviarEmail();