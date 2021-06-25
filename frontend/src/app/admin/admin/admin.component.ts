import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ListRoleComponent } from '../list-role/list-role.component';
import { ListUserComponent } from '../list-user/list-user.component';
import { RegisterRoleComponent } from '../register-role/register-role.component';
import { RegisterUserComponent } from '../register-user/register-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor() {}
  @ViewChild(RegisterUserComponent)
  private registerU!: RegisterUserComponent;

  @ViewChild(ListUserComponent)
  private listU!: ListUserComponent;

  @ViewChild(RegisterRoleComponent) private registerR!: RegisterRoleComponent;

  @ViewChild(ListRoleComponent) private listR!: ListRoleComponent;

  onTabChanged(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.registerU.ngOnInit();
    } else {
      this.listU.ngOnInit(); //Or whatever name the method is called
    }
  }

  onTabChanged2(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.registerR.ngOnInit();
    } else {
      this.listR.ngOnInit(); //Or whatever name the method is called
    }
  }

  ngOnInit(): void {}
}
