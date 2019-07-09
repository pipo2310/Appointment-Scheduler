import { Injectable } from '@angular/core';
import * as email from 'nativescript-email';
import * as nodemailer from "nodemailer";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  composeOptions: email.ComposeOptions;


  NODE_API_SERVER = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public enviarEmail(nombre:string,correo:string,fecha:string,nombreProfesor:string,hora:string): Observable<any> {
  
    return this.httpClient.post(`${this.NODE_API_SERVER}/enviarEmail`,{nombre:nombre,correo:correo,fecha:fecha,nombreProfesor:nombreProfesor,hora:hora}
    ).pipe(tap(res => {
   }));

  }

}
