import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class PaginationService {

  paginationEventEmitter: EventEmitter<any> = new EventEmitter();

  pageSize: number;
  itemsCount: number;
  currentPage: number;

  constructor() { }

}

export interface PaginationEvent {
  pageSize: number;
  itemsCount: number;
  currentPage: number;
}
