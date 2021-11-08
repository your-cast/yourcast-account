import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showSpinner: boolean;
  hide = true;

  form = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.showSpinner = false;
  }

  ngOnInit() {
    console.log('here')
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }
  }

  signIn(credentials: any): any {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        this.form.get(field)?.markAsTouched({onlySelf: true});
      });
      return false;
    }

    this.showSpinner = true;
    this.authService.login(credentials)
      .subscribe((result: any) => {
          this.showSpinner = false;
          if (result && this.authService.isLoggedIn()) {
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            returnUrl = returnUrl !== '/login' ? returnUrl : null;
            this.router.navigate([returnUrl || '/admin']);
          } else {
            this.authService.logout();
          }
        },
        () => {
          this.showSpinner = false;
        });
  }
}
