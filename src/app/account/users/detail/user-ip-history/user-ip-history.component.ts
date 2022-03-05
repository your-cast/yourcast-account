import {Component, Input, OnInit} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';

@Component({
    selector: 'app-user-ip-history',
    templateUrl: './user-ip-history.component.html',
    styleUrls: ['./user-ip-history.component.scss']
})
export class UserIpHistoryComponent implements OnInit {
  @Input()
  history: any[];

    resellerSuppliersSavingInProgress: boolean;
    suppliersShortListState$: Observable<any>;

    allRequestFinished$: Observable<any>;


    ngOnInit(): void {
        // this.suppliersShortListState$ = this.suppliersService.getSuppliersShortList();
        // this.allRequestFinished$ = forkJoin({
        //     suppliersShortListResult: this.suppliersShortListState$,
        // });
        //
        // this.allRequestFinished$.subscribe(value => {
        //     this.suppliersShortList = value.suppliersShortListResult as SupplierShort[];
        // });
    }
}
