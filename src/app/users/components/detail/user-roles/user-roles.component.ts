import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserRole} from '../../../model/UserRole';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
  userRolesFormGroup: FormGroup;
  roles: any[];

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.userRolesFormGroup = this.formBuilder.group({
      webservices: new FormControl(this.roles.includes(UserRole.WEBSERVICES)),
      balance: new FormControl(this.roles.includes(UserRole.BALANCE)),
    });
  }

  saveUserRoles($event: MatSlideToggleChange, userRoles: any) {

  }
}
