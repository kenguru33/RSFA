import { Pipe, PipeTransform } from '@angular/core';
import {Vessel} from "./models/vessel.model";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(vessels: Array<Vessel>, args?: string): Array<Vessel> {
    if (vessels.length === 0 ) return vessels;
    if (args === "") return vessels;

    let resultArray = [];
    for(let vessel of vessels) {
      let match = vessel.prefix + '-' + vessel.id + ' ' + vessel.name;
      let containsSubString = match.toUpperCase().indexOf(args.toUpperCase());
      console.log("contains?",containsSubString);
      if (containsSubString !== -1) {
        resultArray.push(vessel);
      }
      /*if(vessel.name.toUpperCase().startsWith(args.toUpperCase()) || (vessel.prefix + '-' + vessel.id).toUpperCase().startsWith(args.toUpperCase())) {
        resultArray.push(vessel);
      }*/
    }
    return resultArray;
  }

}
