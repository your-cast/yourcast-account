import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {TableComponent} from '../../../common/table/table.component';

@Component({
  selector: 'app-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent extends TableComponent implements OnInit {
  constructor(
    protected usersService: UsersService
  ) {
    super(usersService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData();

    this.displayedColumns = [
      'select',
      'id',
      'name',
      'status'
    ];
  }

  getData(): void {
    this.usersService.getUsersList().subscribe(response => {
      this.dataSource = response.result;
    });
  }

  handleMoveToDetails(element: any) {

  }
}
