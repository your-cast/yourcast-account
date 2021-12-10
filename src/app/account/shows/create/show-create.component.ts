import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-show-create',
  templateUrl: './show-create.component.html',
  styleUrls: ['./show-create.component.scss']
})
export class ShowCreateComponent implements OnInit {
  showSpinner: boolean;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.showSpinner = false;
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.max(150)]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.max(150)]
    });
  }
}
