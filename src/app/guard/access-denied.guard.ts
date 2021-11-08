import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {toasterShow} from '../store/app/actions/app.actions';
import {ToasterNotification} from '../models/notification';
import {Store} from '@ngrx/store';
import {AppState} from '../store/store';
import {PermissionsService} from '../permissions/permissions.service';


@Injectable({providedIn: 'root'})
export class AccessDeniedGuard implements CanActivate {
    constructor(private router: Router, private permissionsService: PermissionsService, private store: Store<AppState>) {
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
            if (!this.router.getCurrentNavigation().previousNavigation) {
                this.router.navigate(['/admin']);
            }
            this.store.dispatch(toasterShow({data: new ToasterNotification('error', 'Access denied!')}));
        }
        return accessIsPresent;
    }


}
