import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Estudiante } from '../modelo/estudiante';
import { Curso } from '../modelo/curso';
import { Observable } from  'rxjs';
import { tap } from  'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'homeStudent' })
};

@Injectable({
  providedIn: 'root'
})


export class EstudianteService {
  PHP_API_SERVER = "http://ec2-18-207-248-234.compute-1.amazonaws.com";
  //PHP_API_SERVER = "http://127.0.0.1:8080";
  
  constructor(private httpClient : HttpClient) { }

  getCursos(estudiante:Estudiante): Observable<Curso[]>{
    //let cedula = estudiante.cedula;
    let cursos:Curso[];
    return this.httpClient.post<Curso[]>(`${this.PHP_API_SERVER}/cursosEst.php`,{
    cedula: estudiante.cedula}, httpOptions)
      .pipe(tap(res => {
        cursos =  res["cursos"];
        //console.log('recuperados');
      }));
      /*let cursos = `${this.PHP_API_SERVER}/homeStudent.php`;
      console.log(cursos);
      return this.httpClient.get<Curso[]>(`${this.PHP_API_SERVER}/homeStudent.php`);*/
      
  }
}
