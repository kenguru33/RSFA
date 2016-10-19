import {Component} from '@angular/core';
import {AisService} from "./ais.service";
import {Vessel} from "./models/vessel.model";

@Component({
  selector: 'rs-vessels',
  templateUrl: 'vessels.component.html',
  styleUrls: ['vessels.component.css']
})
export class VesselsComponent {
  constructor(private aisService: AisService){
    this.aisService.getVesselPositions().subscribe(pos => {
      console.log(pos);
    });

    let v = new Vessel();
    v.mmsi = 257054000;
    this.aisService.getVesselPosition(v).subscribe(pos=>{
      console.log(pos);
    })
  }

}


