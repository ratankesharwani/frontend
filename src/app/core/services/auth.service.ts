import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  private API_URL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.API_URL}/login`, { username, password })
      .pipe(tap((res) => localStorage.setItem(this.tokenKey, res.access_token)));
  }

  register(username: string, password: string) {
    return this.http.post<any>(`${this.API_URL}/register`, { username, password });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
