import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html',
  styleUrls: ['./register-role.component.css'],
})
export class RegisterRoleComponent implements OnInit {
  public registerData: any;
  public successMessage: String;
  public errorMessage: String;
  public rolesArray: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private roleS: RoleService
  ) {
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
    this.rolesArray = [];
  }

  ngOnInit(): void {}

  registerRole() {
    if (!this.registerData.name || !this.registerData.description) {
      console.log('Failed process: Incomplete data');
      this.errorMessage = 'Failed process: Incomplete data';
      this.closeAlert();
      this.registerData = {};
    } else {
      this.roleS.registerRole(this.registerData).subscribe(
        (res: any) => {
          this.registerData = {};
          this.router.navigate(['admin']);
          
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
