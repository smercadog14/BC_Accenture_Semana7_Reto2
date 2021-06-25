import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: String;
  constructor(private http: HttpClient) {
    this.env = environment.APP_URL;
  }

  registerUser(user: any) {
    return this.http.post(this.env + 'user/registerUser', user);
  }

  listUsers() {
    return this.http.get<any>(this.env + 'user/listUsers');
  }

  updateUser(user: any) {
    return this.http.put<any>(this.env + 'user/updateUser', user);
  }

  deactivateUser(user: any) {
    return this.http.put<any>(this.env + 'user/deleteUser', user);
  }

  deleteUser(user: any) {
    return this.http.delete<any>(this.env + 'user/deleteUser/' + user._id);
  }
}
