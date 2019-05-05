import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../modelo/estudiante';
import { Curso } from '../modelo/curso';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  PHP_API_SERVER = "http://ec2-18-207-248-234.compute-1.amazonaws.com";
  constructor(private httpClient : HttpClient) { }
}
