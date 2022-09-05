import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowService} from '../../../services/show.service';
import {Show} from '../../../models/show';
import {AlertService} from '../../../services/alert.service';
import {EpisodesService} from '../../../services/episodes.service';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {
  show: Show;
  episodesColumns: string[] = ['cover', 'title', 'publish', 'status'];
  episodesDataSource: [] = [];

  show$: Observable<any>;
  episodes$: Observable<any>;

  allRequestFinished$: Observable<any>;

  constructor(
    private router: Router,
    private showService: ShowService,
    private episodesService: EpisodesService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const showId = this.activatedRoute.snapshot.paramMap.get('id');

    this.show$ = this.showService.getShowInfo(showId);
    this.episodes$ = this.episodesService.showEpisodesList(showId);

    this.allRequestFinished$ = forkJoin([this.show$, this.episodes$]);

    this.allRequestFinished$.subscribe(value => {
      this.show = value[0].result;
      this.episodesDataSource = value[1].result;
    }, error => {
      this.alertService.error('Something want wrong!');
    });
  }

  getClassByStatus(status: string) {
    switch (status) {
      case 'enabled':
        return 'badge badge-green';
      case 'drafted':
        return 'badge badge-yellow';
      case 'disabled':
        return 'badge badge-gray';
      default:
        return 'badge badge-blue';
    }
  }
}
