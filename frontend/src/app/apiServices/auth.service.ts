import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl = 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, {email,password});
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/signup`, {email,password});
  }
}
