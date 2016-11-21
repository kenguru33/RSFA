import { Pipe, PipeTransform } from '@angular/core';
import {VesselClass} from "./models/vessel-class";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(vesselClasses: Array<VesselClass>, args?: string): Array<VesselClass> {
    if (vesselClasses.length === 0 ) return vesselClasses;
    if (args === "") return vesselClasses;

    let resultArray = [];
    for(let vesselClass of vesselClasses) {
      let match = vesselClass.name;
      let containsSubString = match.toUpperCase().indexOf(args.toUpperCase());
      if (containsSubString !== -1) {
        resultArray.push(vesselClass);
      }
    }
    return resultArray;
  }

}
