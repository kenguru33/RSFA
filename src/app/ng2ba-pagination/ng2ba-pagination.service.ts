import {Injectable, EventEmitter} from '@angular/core';
import {Ng2BaPaginationInfo} from "./interfaces/ng2ba-pagination-info";

@Injectable()
export class Ng2baPaginationService {

  itemsPaginated: EventEmitter<Ng2BaPaginationInfo> = new EventEmitter<Ng2BaPaginationInfo>();

  constructor() { }

  public paginatedItems(items: Array<any>, pageSize: number, page: number) {
    let offset = (page-1)*pageSize;
    return items.slice(offset, offset+pageSize);
  }
}
