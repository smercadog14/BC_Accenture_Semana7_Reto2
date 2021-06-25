import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  public usersData: any;
  public successMessage: String;
  public errorMessage: String;
  public editData: any;
  public roles: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private users: UserService,
    private roleS: RoleService
  ) {
    this.usersData = {};
    this.successMessage = '';
    this.errorMessage = '';
    this.editData = {};
    this.roles = [];
  }

  ngOnInit(): void {
    this.users.listUsers().subscribe(
      (res) => {
        this.usersData = res.users;
      },
      (err) => {
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );

    this.roleS.listRoles().subscribe((res) => {
      this.roles = res.role;
    });
  }

  updateUser(user: any) {
    this.users.updateUser(user).subscribe(
      (res) => {
        this.successMessage = 'User Updated';
        this.closeAlert();
      },
      (err) => {
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  deactivateUser(user: any) {
    this.users.deactivateUser(user).subscribe(
      (res) => {
        user.active = res.user.active;
      },
      (err) => {
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  deleteUser(user: any) {
    this.users.deleteUser(user).subscribe(
      (res) => {
        const index = this.usersData.indexOf(user);

        if (index > -1) {
          this.usersData.splice(index, 1);

          this.successMessage = 'User deleted';
          this.closeAlert();
        }
      },
      (err) => {
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
