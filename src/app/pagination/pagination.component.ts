import {Component, OnInit, Input, EventEmitter, Output, OnDestroy} from '@angular/core';
import {PaginationService, PaginationEvent} from "./pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy {


  @Input() pageSize: number;
  @Input() itemsCount: number = 0;
  @Output() pageSelect: EventEmitter<number> = new EventEmitter<number>();

  private numberOfPages: number;
  private currentPage: number = 1;

  private firstPage = true;
  private lastPage= false;

  constructor(private paginationService: PaginationService) { }

  ngOnInit() {

    this.paginationService.paginationEventEmitter.subscribe((event) => {
      this.pageSize = event.pageSize;
      this.itemsCount = event.itemsCount;
      if (this.itemsCount<this.pageSize){
        this.pageSize = this.itemsCount;
      }
      this.numberOfPages = Math.ceil( this.itemsCount / this.pageSize);
      this.pageSelect.emit(event.page);
    });
  }

  ngOnDestroy(): void {
  }

  get pages(): Array<number> {

    let pages = [];
    pages.push(`${1}-${this.pageSize}`);
    for (let i = 1; i < this.numberOfPages; i++) {
      let fromPage = i*this.pageSize+1;
      let toPage = i*this.pageSize+1+this.pageSize;
      if (toPage > this.itemsCount) {
        toPage = this.itemsCount;
      }
      if (toPage === fromPage) {
        pages.push(toPage);
      } else {
        pages.push(`${fromPage}-${toPage}`);
      }
    }
    return pages ;
  }

  onPageSelect(page: number) {
    this.currentPage = page;
    this.pageSelect.emit(this.currentPage);
  }

  onPreviousPage() {
    this.onPageSelect(this.currentPage-1);
  }

  onNextPage() {
    this.onPageSelect(this.currentPage+1);
  }
}
