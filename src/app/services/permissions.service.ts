import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/store';
import {getUserPermissions} from '../store/user/reducers/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private currentUserPermissions$: Observable<any>;
  private permissions: any;

  constructor(private store: Store<AppState>) {
    this.currentUserPermissions$ = this.store.select(getUserPermissions);
    this.currentUserPermissions$.subscribe(permissions => {
      this.permissions = permissions;
    });
  }

  getUserPermissions(): string[] {
    if (this.permissions) {
      return this.permissions;
    }
    return [];
  }
}
