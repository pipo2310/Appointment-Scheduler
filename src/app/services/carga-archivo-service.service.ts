import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CargaArchivoServiceService {

  NODE_API_SERVER = "http://localhost:3000";
  constructor(private http: HttpClient){}

	public postFileArchivo(ArchivoParaSubir: File){

		const formData = new FormData(); 
		formData.append('Archivo', ArchivoParaSubir, ArchivoParaSubir.name); 
		return this.http.post( `${this.NODE_API_SERVER}/saveFile` , formData);

	}
}
