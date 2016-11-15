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
    let ambulanseArray = [];
    let primaryArray = [];
    let secondaryArray = [];

    let resultArray = [];

    if (!p && !s && !r && !a) return stations;

    if (!p && !s && !r && a) {
      resultArray = this.filterAmbulanse(stations);
      console.log('a', resultArray);
      return resultArray;
    }

    if (!p && !s && r && !a) {
      resultArray = this.filterRsrk(stations);
      console.log('r');
      return resultArray;
    }

    if (!p && !s && r && a) {
      console.log('r+a');
      ambulanseArray = this.filterAmbulanse(stations);
      rsrkArray = this.filterRsrk(stations);
      resultArray = ambulanseArray.concat(rsrkArray);
      return resultArray;
    }

    if (!p && s && !r && !a) {
      resultArray = this.filterSecondary(stations);
      console.log('s');
      return resultArray;
    }

    if (!p && s && !r && a) {
      console.log('s+a');
      ambulanseArray = this.filterAmbulanse(stations);
      secondaryArray = this.filterSecondary(stations);
      resultArray = ambulanseArray.concat(secondaryArray)
      return resultArray;
    }

    if (!p && s && r && !a) {
      console.log('s+r');
    }

    if (!p && s && r && a) {
      console.log('s+r+a');
    }

    if (p && !s && !r && !a) {
      resultArray = this.filterPrimary(stations);
      console.log('p');
      return resultArray;
    }

    if (p && !s && !r && a) {
      console.log('p+a');
    }

    if (p && !s && r && !a) {
      console.log('p+r');
    }

    if (p && !s && r && a) {
      console.log('p+r+a');
    }

    if (p && s && !r && !a) {
      console.log('p+s');
    }

    if (p && s && !r && a) {
      console.log('p+s+a');
    }

    if (p && s && r && !a) {
      console.log('p+s+r');
    }

    if (p && s && r && a) {
      console.log('p+s+r+a');
    }
    return stations;
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
    let resultArray = [];
    for (let station of stations) {
      if (station.stationType === 'Primærstasjon') {
        resultArray.push(station);
      }
    }
    return resultArray;
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
    let resultArray = [];
    for (let station of stations) {
      if (station.stationType === 'Sekundærstasjon') {
        resultArray.push(station);
      }
    }
    return resultArray;
  }
}

