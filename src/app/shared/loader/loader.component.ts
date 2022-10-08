import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getApiReqCount} from '../../store/app/reducers/app.reducer';
import {AppState} from '../../store/store';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isVisible = false;
  apiReq$: Observable<number>;

  @ViewChild(MatProgressBar, {static: true}) loading: MatProgressBar;

  constructor(private store: Store<AppState>) {
    this.apiReq$ = store.select(getApiReqCount);
  }

  ngOnInit() {
    this.apiReq$.subscribe(result => {
      this.isVisible = result > 0;
    });
  }
}
