import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private currentUser: any;

  getUserRoles(): string[] {
    if (this.currentUser) {
      return this.currentUser.roles;
    }
    return [];
  }

  getCurrentUserLogin(): string {
    return this.currentUser.username;
  }
}
