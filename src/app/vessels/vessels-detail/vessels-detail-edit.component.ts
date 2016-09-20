import {Component, OnInit} from '@angular/core';
import {Vessel} from "../models/vessel.model";
import {VesselsService} from "../vessels.service";
import {VesselStatusCode} from "../models/vessel-status-code";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'rs-vessels-detail-edit',
  templateUrl: 'vessels-detail-edit.component.html',
  styleUrls: ['vessels-detail.component.css']
})
export class VesselsDetailEditComponent implements OnInit {

    vessel: Vessel;
    statusCodes: Array<VesselStatusCode>;

  constructor(private vesselsService: VesselsService, private location: Location, private router: Router) {
    this.vessel = new Vessel;
      this.vessel.status = 0;
  }

  ngOnInit() {
      this.statusCodes = this.vesselsService.getStatusCodes();
  }


  onCancel() {
      this.location.back();
  }

  onSubmit(vessel) {
      this.vesselsService.storeVessel(vessel).subscribe((key: string) => {
            this.router.navigate(['skøyter', key]);
      }, error => {
          console.log(error);
      });
  }
}
