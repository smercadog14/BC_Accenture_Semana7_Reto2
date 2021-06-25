import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private env: String;
  constructor(private http: HttpClient) {
    this.env = environment.APP_URL;
  }

  registerRole(role: any) {
    return this.http.post(this.env + 'role/registerRole', role);
  }

  listRoles() {
    return this.http.get<any>(this.env + 'role/listRole');
  }

  updateRole(role: any) {
    return this.http.put<any>(this.env + 'role/updateRole', role);
  }

  deactivateRole(role: any) {
    return this.http.put<any>(this.env + 'role/deleteRole', role);
  }

  deleteRole(role: any) {
    return this.http.delete<any>(this.env + 'role/deleteRole/' + role._id);
  }
}
