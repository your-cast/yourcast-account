import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-show-create',
  templateUrl: './show-create.component.html',
  styleUrls: ['./show-create.component.scss']
})
export class ShowCreateComponent implements OnInit {
  showSpinner: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.showSpinner = false;
  }

  ngOnInit() {
  }
}
