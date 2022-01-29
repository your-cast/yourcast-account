import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {PermissionsService} from '../services/permissions.service';


@Injectable({providedIn: 'root'})
export class AccessDeniedGuard implements CanActivate {
  constructor(
    private router: Router,
    private permissionsService: PermissionsService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let accessIsPresent = false;
    if (route.data.roles) {
      (route.data.roles as string[]).forEach(role => {
        if (this.permissionsService.getUserRoles().includes(role)) {
          accessIsPresent = true;
        }
      });
    }
    if (!accessIsPresent) {
      if (!this.router.getCurrentNavigation()?.previousNavigation) {
        this.router.navigate(['/dashboard']);
      }
    }
    return accessIsPresent;
  }


}
