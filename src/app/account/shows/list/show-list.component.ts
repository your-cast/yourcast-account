import {Component, OnInit} from '@angular/core';
import {ShowService} from '../../../services/show.service';
import {TableComponent} from '../../../common/table/table.component';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent extends TableComponent implements OnInit {
  constructor(
    protected showService: ShowService
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
    console.log(element);
  }
}
