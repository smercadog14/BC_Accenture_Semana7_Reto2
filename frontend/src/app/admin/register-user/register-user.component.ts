import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  public registerData: any;
  public successMessage: String;
  public errorMessage: String;
  public roles: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userS: UserService,
    private roleS: RoleService
  ) {
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
    this.roles = [];
  }

  ngOnInit(): void {
    this.roleS.listRoles().subscribe((res) => {
      this.roles = res.role;
    });
  }

  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      console.log('Failed process: Incomplete data');
      this.errorMessage = 'Failed process: Incomplete data';
      this.closeAlert();
      this.registerData = {};
    } else {
      this.userS.registerUser(this.registerData).subscribe(
        (res: any) => {
          this.registerData = {};
        },
        (err) => {
          this.errorMessage = err.error;
          this.closeAlert();
          this.registerData = {};
        }
      );
    }
  }
  closeAlert() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
  closeX() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
