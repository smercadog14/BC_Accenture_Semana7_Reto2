import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private env: String;
  private admin: Boolean;
  constructor(private http: HttpClient, private router: Router) {
    this.env = environment.APP_URL;
    this.admin = false;
  }

  login(user: any) {
    return this.http.post(this.env + 'auth/login', user);
  }

  loggedIn() {
    // console.log('puro perreo');

    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAdmin() {
    return this.http.get<any>(this.env + 'auth/admin');
  }

  setAdmin(admin: boolean) {
    if (admin) localStorage.setItem('admin', 'true');
    this.admin = admin;
  }

  getAdmin() {
    return !!localStorage.getItem('admin');
  }
}
