import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowService} from '../../../services/show.service';
import {TableComponent} from '../../../common/table/table.component';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {
  show: any;

  constructor(
    protected showService: ShowService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.showService.getShowInfo(id).subscribe(response => {
      this.show = response.result;
    });
  }

  handleMoveToDetails(element: any): void {
    this.router.navigate(['/account/shows/details/' + element.id]);
  }
}
