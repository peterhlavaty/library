import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/login';

  authenticated: boolean = false;

  constructor(private http: HttpClient) { }

  login(name: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('name', name);
    body.set('password', password);

    return this.http.post(this.apiUrl, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  isAuthenticated() {
    return this.authenticated;
  }
}
