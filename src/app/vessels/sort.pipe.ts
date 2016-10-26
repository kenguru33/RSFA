import { Pipe, PipeTransform } from '@angular/core';
import {Vessel} from "./models/vessel.model";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(vessels: Array<Vessel>, args?: any): any {
    vessels.sort((v1: Vessel,v2: Vessel)=> {
      return v1.id-v2.id;
    });
    return vessels;
  }

}
