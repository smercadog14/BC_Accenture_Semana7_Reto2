import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerData: any;
  public successMessage: String;
  public errorMessage: String;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userS: UserService
  ) {
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {}

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
          localStorage.setItem('token', res.jwtToken);
          this.registerData = {};
          this.router.navigate(['/saveTask']);
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
