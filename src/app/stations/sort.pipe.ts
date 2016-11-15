import { Pipe, PipeTransform } from '@angular/core';
import {Station} from "./models/station";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(stations: Array<Station>, args?: any): any {

    stations.sort((s1, s2) => {
      return s1.name.toLowerCase().localeCompare(s2.name.toLocaleLowerCase())
    });
    return stations;
  }

}
