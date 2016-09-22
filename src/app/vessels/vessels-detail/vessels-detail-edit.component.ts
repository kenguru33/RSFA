import {Component, OnInit, OnDestroy} from '@angular/core';
import {Vessel} from "../models/vessel.model";
import {VesselsService} from "../vessels.service";
import {VesselStatusCode} from "../models/vessel-status-code";
import {Location} from "@angular/common";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'rs-vessels-detail-edit',
  templateUrl: 'vessels-detail-edit.component.html',
  styleUrls: ['vessels-detail.component.css']
})
export class VesselsDetailEditComponent implements OnInit, OnDestroy {
    vessel: Vessel;
    statusCodes: Array<VesselStatusCode>;

    activatedRouteSubscription: Subscription;

    private vesselsLoading;

    private editMode=false;

  constructor(private vesselsService: VesselsService, private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
      this.vesselsLoading = true;
      this.statusCodes = this.vesselsService.getStatusCodes();
          this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
              if (params['key']) {
                  this.vesselsService.getVessel(params['key']).subscribe(vessel=>{
                      this.vessel = vessel;
                      this.editMode = true;
                      this.vesselsLoading = false;
                  })
              } else {
                  this.vessel = new Vessel;
                  this.vessel.status = 0;
                  this.editMode = false;
                  this.vesselsLoading = false;
              }

          });
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
  }

  onCancel() {
      this.location.back();
  }

  onSubmit(vessel) {
      if (this.editMode) {
          console.log('do we have key?',this.vessel.key);
          this.vesselsService.updateVessel(this.vessel).subscribe((key: string) => {
              this.router.navigate(['skøyter', key]);
          }, error => {
              console.log(error);
          });
      } else {
          this.vesselsService.storeVessel(vessel).subscribe((key: string) => {
              this.router.navigate(['skøyter', key]);
          }, error => {
              console.log(error);
          });
      }

  }
}
