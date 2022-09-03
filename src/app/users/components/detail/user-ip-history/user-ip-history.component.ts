import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-ip-history',
  templateUrl: './user-ip-history.component.html',
  styleUrls: ['./user-ip-history.component.scss']
})
export class UserIpHistoryComponent implements OnInit {
  @Input()
  history: any[];

  ngOnInit(): void {

  }
}
