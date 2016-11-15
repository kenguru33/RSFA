import {Component, OnInit, OnDestroy} from '@angular/core';
import {VesselClassesService} from "../vessel-classes.service";
import {VesselsService} from "../../vessels/vessels.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {VesselClass} from "../models/vessel-class";
import {Location} from "@angular/common";

@Component({
  selector: 'app-vessel-classes-detail-edit',
  templateUrl: './vessel-classes-detail-edit.component.html',
  styleUrls: ['./vessel-classes-detail.component.css']
})
export class VesselClassesDetailEditComponent implements OnInit, OnDestroy {

  private vesselClass: VesselClass;

  activatedRouteSubscription: Subscription;

  private editMode=false;

  page: number = 1;

  isLoading: boolean;

  private showDialog = false;
  private dialogMessage = '';
  private dialogTitle = '';

  constructor(private vesselsClassesService: VesselClassesService,
              private vesselsService: VesselsService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private router: Router) {}

  ngOnInit() {
      this.isLoading = true;
      this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
        if (params['key']) {
          this.vesselsClassesService.getVesselClass(params['key']).subscribe(vesselClass=>{
            this.vesselClass = vesselClass;
            this.editMode = true;
            this.isLoading = false;
          })
        } else {
          this.vesselClass = new VesselClass;
          this.vesselClass.name = "";
          this.vesselClass.crew = 0;
          this.vesselClass.design = "";
          this.editMode = false;
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
  }

  onCancel() {
    this.location.back();
  }

  onSubmit(vesselClass: VesselClass) {
    if (this.editMode) {
      this.vesselsClassesService.updateVesselClass(this.vesselClass).subscribe((key: string) => {
        this.router.navigate(['klasser', key]);
      }, error=>{
        console.log(error);
      });
    } else {
      this.vesselsClassesService.storeVesselClass(vesselClass).subscribe((key: string) => {
        this.router.navigate(['klasser', key])
      });
    }
  }
}
