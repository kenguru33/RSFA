import {Pipe, PipeTransform, EventEmitter} from '@angular/core';
import {PaginationService, PaginationEvent} from "./pagination.service";

@Pipe({
  name: 'paginate',
})
export class PaginationPipe implements PipeTransform {

  constructor(private paginationService: PaginationService) {}

  transform(items: Array<any>, args?: any): Array<any> {

    let pagEvent = {
      pageSize: args[0].pageSize,
      itemsCount: items.length,
      page: args[0].page
    };

    if (pagEvent.pageSize>pagEvent.itemsCount) {
      pagEvent.page = 1;
    }

    this.paginationService.paginationEventEmitter.emit(pagEvent);

    return this.paginatedItems(items,args[0].pageSize,args[0].page);
  }

  private paginatedItems(items: Array<any>, pageSize: number, page: number) {
    let offset = (page-1)*pageSize;
    return items.slice(offset, offset+pageSize);
  }


}
