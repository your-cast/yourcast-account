import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowService} from '../../../services/show.service';
import {Show} from '../../../models/show';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {
  show: Show;

  constructor(
    private router: Router,
    private showService: ShowService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.showService.getShowInfo(id).subscribe(response => {
      this.show = response.result;
    });
  }
}
