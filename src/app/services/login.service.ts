import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'login' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  PHP_API_SERVER = "http://127.0.0.1:8080";
  constructor(private httpClient : HttpClient) { }

  public login(username : string, password : string) {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/login.php`, {
      user: username,
      pass: password
    }, httpOptions);
  }
}
