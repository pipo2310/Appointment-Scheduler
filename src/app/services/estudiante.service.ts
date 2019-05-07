import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Estudiante } from '../modelo/estudiante';
import { Curso } from '../modelo/curso';
import { Observable } from  'rxjs';
import { tap } from  'rxjs/operators';
import { Profesor } from '../modelo/profesor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'homeStudent' })
};

@Injectable({
  providedIn: 'root'
})


export class EstudianteService {
  PHP_API_SERVER = "http://ec2-18-207-248-234.compute-1.amazonaws.com";
  
  constructor(private httpClient : HttpClient) { }

  getCursos(estudiante:Estudiante): Observable<Curso[]>{
    let cursos:Curso[];
    return this.httpClient.post<Curso[]>(`${this.PHP_API_SERVER}/cursosEst.php`,{
    cedula: estudiante.cedula}, httpOptions)
      .pipe(tap(res => {
        cursos =  res["cursos"];
      }));
  }

  public getProfesores(curso : Curso) {
    let profesores:Profesor[];
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/profCurso.php`, {
      sigla: curso.sigla }, httpOptions)
    .pipe(tap(res => {
      profesores = res["profesores"];
    }));
  }
  public conmutarLogueado(estudiante:Estudiante) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/logueado.php`,
    {cedula: estudiante.cedula}, httpOptions);
  }
}
