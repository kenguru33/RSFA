import { Pipe, PipeTransform } from '@angular/core';
import {Station} from "./models/station";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(stations: Array<Station>, args?: string): Array<Station> {
    if (stations.length === 0 ) return stations;
    if (args === "") return stations;

    let resultArray = [];
    for(let station of stations) {
      let match = station.name;
      let containsSubString = match.toUpperCase().indexOf(args.toUpperCase());
      if (containsSubString !== -1) {
        resultArray.push(station);
      }
    }
    return resultArray;
  }

}
