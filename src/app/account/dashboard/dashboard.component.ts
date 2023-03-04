import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowService} from '../../services/show.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showSpinner: boolean;
  data: any;

  constructor(
    private showService: ShowService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.showSpinner = false;
  }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.showService.showList().subscribe(response => {
      this.data = response.result;
    });
  }
}
