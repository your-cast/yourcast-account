import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserRole} from '../../../model/UserRole';
import {AlertService} from '../../../../services/alert.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
  userRolesFormGroup: FormGroup;
  roles: any[] = [];

  constructor(private formBuilder: FormBuilder ,private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.userRolesFormGroup = this.formBuilder.group({
      showRead: new FormControl(this.roles.includes(UserRole.SHOW_READ)),
      showWrite: new FormControl(this.roles.includes(UserRole.SHOW_WRITE)),
      showAnalytics: new FormControl(this.roles.includes(UserRole.SHOW_ANALYTICS)),
      episodesRead: new FormControl(this.roles.includes(UserRole.EPISODES_READ)),
      episodesWrite: new FormControl(this.roles.includes(UserRole.EPISODES_WRITE)),
      newsRead: new FormControl(this.roles.includes(UserRole.NEWS_READ)),
      newsWrite: new FormControl(this.roles.includes(UserRole.NEWS_WRITE)),
      subscribersRead: new FormControl(this.roles.includes(UserRole.SUBSCRIBERS_READ)),
      subscribersWrite: new FormControl(this.roles.includes(UserRole.SUBSCRIBERS_WRITE)),
      supportRead: new FormControl(this.roles.includes(UserRole.SUPPORT_READ)),
      supportWrite: new FormControl(this.roles.includes(UserRole.SUPPORT_WRITE)),
      contactsFormRead: new FormControl(this.roles.includes(UserRole.CONTACTS_READ)),
      contactsFormWrite: new FormControl(this.roles.includes(UserRole.CONTACTS_WRITE)),
      userRead: new FormControl(this.roles.includes(UserRole.USER_READ)),
      userWrite: new FormControl(this.roles.includes(UserRole.USER_WRITE)),
      profileRead: new FormControl(this.roles.includes(UserRole.PROFILE_READ)),
      profileWrite: new FormControl(this.roles.includes(UserRole.PROFILE_WRITE)),
      rolesUpdate: new FormControl(this.roles.includes(UserRole.ROLES_UPDATE)),
      notificationsRead: new FormControl(this.roles.includes(UserRole.NOTIFICATIONS_READ)),
      settingsRead: new FormControl(this.roles.includes(UserRole.SETTINGS_READ)),
      settingsWrite: new FormControl(this.roles.includes(UserRole.SETTINGS_WRITE)),
    });
  }

  saveUserRoles() {
    console.log(this.userRolesFormGroup.value);
    this.alertService.success('User roles was updated!');
  }
}
