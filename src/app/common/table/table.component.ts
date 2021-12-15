import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  selection: any[] = [];
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  loading: boolean = false;
  totalCount: number = 0;

  constructor(
    protected apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
  }

  isAllSelected(): boolean {
    if (!this.dataSource.length) {
      return false;
    }
    const numSelected = this.selection.length;
    const numRows = this.dataSource.length;
    return numSelected >= numRows;
  }

  masterToggle(): any {
    if (this.isAllSelected()) {
      this.selection = [];
    } else {
      this.dataSource.forEach(item => {
        this.selection.push(item.ID);
      });
    }
  }

  onToggle(element: any): void {
    if (this.selection.includes(element.ID)) {
      this.selection.splice(this.selection.indexOf(element.ID), 1);
    } else {
      this.selection.push(element.ID);
    }
  }

  isSelected(element: any): boolean {
    return this.selection.includes(element.ID);
  }
}
