import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ShowService} from '../../services/show.service';
import {TableComponent} from '../../common/table/table.component';

@Component({
  selector: 'app-show-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent extends TableComponent implements OnInit {
  constructor(
    protected showService: ShowService,
    private router: Router,
  ) {
    super(showService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData();

    this.displayedColumns = [
      'select',
      'id',
      'artwork',
      'title',
      'description',
      'format',
      'category',
      'status'
    ];
  }

  getData(): void {
    this.showService.showList().subscribe(response => {
      this.dataSource = response.result;
    });
  }

  handleMoveToDetails(element: any): void {
    this.router.navigate(['/shows/details/' + element.id]);
  }

  getClassByStatus(status: string): string {
    const value = status.toLowerCase();
    switch (value) {
      case 'enabled':
        return 'badge badge-green';
      case 'disabled':
        return 'badge badge-red';
      default:
        return 'badge badge-gray';
    }
  }
}
