import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from '../modelo/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  PHP_API_SERVER = "http://127.0.0.1:8080";
  constructor(private httpClient : HttpClient) { }
}
