import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/usuario';
import { Observable } from  'rxjs';
import { Profesor } from '../modelo/profesor';
import { Estudiante } from '../modelo/estudiante';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  PHP_API_SERVER = "http://127.0.0.1:8080";
  constructor(private httpClient : HttpClient) { }

  public login(usuario : Usuario) : Observable<boolean> {
    var username = usuario.username;
    var pass = usuario.pass;
    return this.httpClient.get<boolean>(`${this.PHP_API_SERVER}/login.php/?username=${username}&pass=${pass}`);
  }

  public getProfesor(username : string) : Observable<Profesor> {
    return this.httpClient.get<Profesor>(`${this.PHP_API_SERVER}/login.php/?username=${username}}`);
  }

  public getEstudiante(username : string) : Observable<Estudiante> {
    return this.httpClient.get<Estudiante>(`${this.PHP_API_SERVER}/login.php/?username=${username}`);
  }
}
