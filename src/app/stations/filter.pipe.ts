import { Pipe, PipeTransform } from '@angular/core';
import {Station} from "./models/station";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(stations: Array<Station>, args?: any): any {

    let p = args[0]; // primary
    let s = args[1]; // secondary
    let r = args[2]; // rsrk
    let a = args[3]; // ambulanse

    let rsrkArray = [];
    let primaryArray = [];
    let secondaryArray = [];
    let ambulanse = [];

    let resultArray = [];

    if (!p && !s && !r && !a) return stations;

    if (!p && !s && !r && a) {
      resultArray = this.filterAmbulanse(stations);
      console.log('filter ambulanse', resultArray);
      return resultArray;
    }

    if (!p && !s && r && !a) {
      resultArray = this.filterRsrk(stations);
      console.log('filter rsrk', resultArray);
      return resultArray;
    }

    if (!p && s && !r && !a) {
      resultArray = this.filterSecondary(stations);
      console.log('filter ambulanse', resultArray);
      return resultArray;
    }

    if (p && !s && !r && a) {
      resultArray = this.filterPrimary(stations);
      console.log('filter ambulanse', resultArray);
      return resultArray;
    }

    return resultArray;

  }

  private filterAmbulanse(stations: Array<Station>) {
    let resultArray = [];
    for (let station of stations) {
      if (station.stationType === 'Ambulansestasjon') {
        resultArray.push(station);
      }
    }
    return resultArray;
  }

  private filterPrimary(stations: Array<Station>) {
    return stations;
  }

  private filterRsrk(stations: Array<Station>) {
    let resultArray = [];
    for (let station of stations) {
      if (station.stationType === 'Sjøredningskorps') {
        resultArray.push(station);
      }
    }
    return resultArray;
  }


  private filterSecondary(stations: Array<Station>) {
    return stations;
  }
}

