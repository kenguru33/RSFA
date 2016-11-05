import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Ng2baPaginationService} from "./ng2ba-pagination.service";
import {Subscription} from "rxjs";
import {Ng2BaPaginationInfo} from "./interfaces/ng2ba-pagination-info";

@Component({
  selector: 'app-ng2ba-pagination',
  templateUrl: './ng2ba-pagination.component.html',
  styleUrls: ['./ng2ba-pagination.component.css']
})
export class Ng2baPaginationComponent implements OnInit {

  @Input() id: string;
  @Input() pageSize: number;
  @Input() showRange: boolean = false;
  @Input() numberOfPages: number;
  @Input() currentPage: number = 1;

  @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();

  totalItems: number;
  itemsPaginated: Subscription;

  constructor(private paginationService: Ng2baPaginationService) {}

  ngOnInit() {
    this.itemsPaginated = this.paginationService.itemsPaginated.subscribe(paginationInfo=>{
      if (this.id != paginationInfo.id) return;
      this.pageSize = paginationInfo.pageSize;
      this.currentPage = paginationInfo.currentPage;
      this.totalItems = paginationInfo.totalItems;
      this.numberOfPages = Math.ceil(this.totalItems / this.pageSize);
      this.pageSelected.emit(this.currentPage);
    });
  }

  get pages(): Array<number> {

    let pages = [];
    if (this.showRange) {
      pages.push(`${1}-${this.pageSize}`);
      for (let i = 1; i < this.numberOfPages; i++) {
        let fromPage = i*this.pageSize+1;
        let toPage = i*this.pageSize+1+this.pageSize;
        if (toPage > this.totalItems) {
          toPage = this.totalItems;
        }
        if (toPage === fromPage) {
          pages.push(toPage);
        } else {
          pages.push(`${fromPage}-${toPage}`);
        }
      }
    }
    else {
      for (let i = 0; i < this.numberOfPages; i++) {
        pages.push(i+1);
      }
    }
    return pages ;
  }

  onPageSelect(page: number) {
    this.currentPage = page;
    this.pageSelected.emit((this.currentPage));
  }

  onPreviousPage() {
    if (this.currentPage > 1 ) {
      this.onPageSelect(this.currentPage-1);
    }
  }

  onNextPage() {
    if (this.currentPage < this.numberOfPages )
    this.onPageSelect(this.currentPage+1);
  }
}
