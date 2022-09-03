import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {TableComponent} from '../../../common/table/table.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent extends TableComponent implements OnInit {
  constructor(
    protected usersService: UsersService,
    private router: Router,
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
      'email',
      'role',
      'tariff',
      'system_id',
      'status'
    ];
  }

  getData(): void {
    this.usersService.getUsersList().subscribe(response => {
      this.dataSource = response.result;
    });
  }

  handleMoveToDetail(element: any) {
    this.router.navigate(['/users/detail/' + element.id]);
  }
}
