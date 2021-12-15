import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})

export class PaginationComponent implements OnInit, OnChanges {
  @Input() total: number = 10;
  @Input() selectedLimit: number = 10;
  @Output() pageChange = new EventEmitter<any>();
  @Output() countChange = new EventEmitter<any>();
  currentPage = 1;
  limits: number[] = [10, 20, 50, 100];
  pages: number[] = [];

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.total && this.selectedLimit || this.total === 0) {
      this.initPaginator(this.selectedLimit, this.total);
    }
  }

  onSelectPage(page: number): void {
    if (page <= this.pages.length) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  onSelectLimit(limit: number): void {
    this.currentPage = 1;
    this.selectedLimit = limit;
    this.countChange.emit(this.selectedLimit);
  }

  private initPaginator(selectedLimit: number, size: number): void {
    if (!size) {
      this.pages = new Array(1);
      return;
    }
    const a = size / selectedLimit;
    this.pages = new Array(Math.ceil(a));
  }
}
