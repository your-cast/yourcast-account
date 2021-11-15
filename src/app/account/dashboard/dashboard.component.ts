import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showSpinner: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.showSpinner = false;
  }

  ngOnInit() {
    console.log('here');
  }
}
