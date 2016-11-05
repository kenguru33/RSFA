import {Pipe, PipeTransform, EventEmitter} from '@angular/core';
import {Ng2BaPaginationInfo} from "./interfaces/ng2ba-pagination-info";
import {Ng2baPaginationService} from "./ng2ba-pagination.service";

@Pipe({
  name: 'paginate'
})
export class Ng2baPaginationPipe implements PipeTransform {

  constructor(private paginationService: Ng2baPaginationService) {}

  transform(items: Array<any>, paginationInfo: Ng2BaPaginationInfo): any {

    paginationInfo.totalItems = items.length;
    if(paginationInfo.totalItems < paginationInfo.pageSize) paginationInfo.currentPage=1;
    this.paginationService.itemsPaginated.emit(paginationInfo);
    return this.paginationService.paginatedItems(items, paginationInfo.pageSize, paginationInfo.currentPage);
  }



}
