import { Pipe, PipeTransform } from '@angular/core';
import {Vessel} from "./models/vessel.model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(vessels: Array<Vessel>, args?: any): any {

    let o = args[0];
    let f = args[1];
    let r = args[2];

    let rsrkArray = [];
    let fastArray = [];

    let resultArray = [];

    console.log('filter start',args);

    if (!o&&!f&&!r) return vessels;

    if (!o&&!f&&r) {
      resultArray = this.filterRsrk(vessels);
      console.log('rsrk', resultArray);
      return resultArray;
    }

    if (!o&&f&&!r) {
      fastArray = this.filterFast(vessels);
      return fastArray;
    }

    if (!o&&f&&r) {
      fastArray = this.filterFast(vessels);
      rsrkArray = this.filterRsrk(vessels);
      resultArray = fastArray.concat(rsrkArray);
      return resultArray;
    }

    if (o&&!f&&!r) {
      resultArray = this.filterOpertive(vessels);
      return resultArray;
    }

    if (o&&!f&&r) {
      for(let rsrkVessel of this.filterRsrk(vessels)) {
        if(rsrkVessel.status === 0 ) {
          resultArray.push(rsrkVessel);
        }
      }
      return resultArray;
    }

    if (o&&f&&!r) {
      for (let fastVessel of this.filterFast(vessels)) {
        if (fastVessel.status === 0) {
          resultArray.push(fastVessel);
        }
      }
      return resultArray;
    }

    if (o&&f&&r) {
      fastArray = this.filterFast(vessels);
      rsrkArray = this.filterRsrk(vessels);
      resultArray = this.filterOpertive(fastArray.concat(rsrkArray));
      return resultArray;
    }
  }




  filterRsrk(vessels) {
    console.log('filterRsrk');
    let resultArray = [];
    for(let vessel of vessels) {
      console.log('vessel object:',vessel);
      if(vessel.staff === 'RSRK') {
        resultArray.push(vessel);
      }
    }
    return resultArray;
  }

  filterFast(vessels) {
    console.log('filterFast');
    let resultArray = [];
    for(let vessel of vessels) {
      if(vessel.staff === 'Fast') {
        resultArray.push(vessel);
      }
    }
    return resultArray;
  }

  filterOpertive(vessels) {
    console.log('filterOperative');
    let resultArray = [];
    for(let vessel of vessels) {
      if(vessel.status === 0) {
        resultArray.push(vessel);
      }
    }
    return resultArray;
  }

}
