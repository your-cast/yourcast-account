import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {
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
