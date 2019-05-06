import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from '../modelo/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  PHP_API_SERVER = "http://ec2-18-207-248-234.compute-1.amazonaws.com";
  constructor(private httpClient : HttpClient) { }
}
