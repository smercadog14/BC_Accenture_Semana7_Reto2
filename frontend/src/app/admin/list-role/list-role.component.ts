import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css'],
})
export class ListRoleComponent implements OnInit {
  public rolesData: any;
  public successMessage: String;
  public errorMessage: String;
  public editData: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private roleS: RoleService
  ) {
    this.rolesData = {};
    this.successMessage = '';
    this.errorMessage = '';
    this.editData = {};
  }

  ngOnInit(): void {
    this.draw();
  }

  draw() {
    this.roleS.listRoles().subscribe(
      (res) => {
        this.rolesData = res.role;
      },
      (err) => {
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  updateRole(role: any) {
    this.roleS.updateRole(role).subscribe(
      (res) => {
        this.successMessage = 'role Updated';
        this.closeAlert();
      },
      (err) => {
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  deactivateRole(role: any) {
    this.roleS.deactivateRole(role).subscribe(
      (res) => {
        role.active = res.role.active;
      },
      (err) => {
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  deleteRole(role: any) {
    this.roleS.deleteRole(role).subscribe(
      (res) => {
        const index = this.rolesData.indexOf(role);

        if (index > -1) {
          this.rolesData.splice(index, 1);

          this.successMessage = 'role deleted';
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
