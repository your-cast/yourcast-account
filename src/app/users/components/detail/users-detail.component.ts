import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
  user: any;
  history: any[] = [];
  roles: any[] = [];

  constructor(
    protected usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.getUserDetail(id).subscribe(response => {
      this.user = response.result;
      this.history = response.result.history;
      this.prepareRoles();
    });
  }

  prepareRoles(): void {
    this.user.roles.forEach((value: any) => {
      this.roles.push(value.role);
    })
  }

  openDialog(): void {

  }
}
