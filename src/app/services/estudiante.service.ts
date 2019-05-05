import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../modelo/estudiante';
import { Curso } from '../modelo/curso';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  PHP_API_SERVER = "http://127.0.0.1:8080";
  constructor(private httpClient : HttpClient) { }
}
