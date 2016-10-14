import {Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {VesselsService} from "../vessels.service";
import {Vessel} from "../models/vessel.model";
import {Subscription} from "rxjs";
import {Station} from "../../stations/models/station";
import {StationsService} from "../../stations/stations.service";
import {VesselStatusCode} from "../models/vessel-status-code";
@Component({
  selector: 'rs-vessels-list',
  templateUrl: 'vessels-list.component.html',
  styleUrls: ['vessels-list.component.css']
})
export class VesselsListComponent implements OnInit, OnDestroy {

  private vessels: Vessel[] = [];

  private selectedVessel: Vessel;
  private selectedIndex: number;

  private showFilterOptions = false;
  private filterBemannet = false;
  private filterRSRK = false;
  private filterOperativ = false;
  private filterDisabled = true;

  private showDialog = false;
  private dialogMessage = '';
  private dialogTitle = '';
  private buttonPrimaryText = '';
  private buttonSecondaryText = '';

  private isLoading;

  private vesselChangedSubscription: Subscription;

  private vesselSearch ="";

  constructor(private vesselsService: VesselsService, private router: Router) {

  }

  ngOnInit(): void {
    this.vesselChangedSubscription = this.vesselsService.vesselListChanged.subscribe( key => {
      this.getVessels();
    });
    this.getVessels();
  }

    ngOnDestroy(): void {
        this.vesselChangedSubscription.unsubscribe();
    }

    getVessels() {
    this.isLoading = true;
    this.vesselsService.getVessels().subscribe(vessels => {
      this.vessels = vessels;
      this.isLoading = false;
    }, error => {
      console.log('error code', error.status);
      if (error.status === 401) {
        this.router.navigate(['logginn']).then(()=>{
          console.log("Are we navigating?");
        });
      }
    });
  }

  private deleteVessel(value: boolean) {
    this.showDialog = false;
    if (!value) return;
    let index = this.vessels.indexOf(this.selectedVessel);
    if (index > -1) {
      this.vessels.splice(index, 1);
    }
    this.vesselsService.deleteVessel(this.selectedVessel).subscribe(()=>{
      console.log('we have a successfull deltion');
    },error => {
      if (error.status === 401) {
        this.router.navigate(['/logginn']);
      }
    });
  }

  onDeleteVessel(index: number) {
    if (index > -1) {
      this.selectedVessel = this.vessels[index];
    }
    this.showDialogBox('Slette ' + this.selectedVessel.id + '-' + this.selectedVessel.name + '?');
  }

  private showDialogBox(message: string) {
    this.dialogTitle = '';
    this.dialogMessage = message;
    this.showDialog = true;
  }

  private showErrorDialog(errorMessage: string) {
    this.dialogTitle = '';
    this.dialogMessage = errorMessage;
    this.showDialog = true;
    this.buttonSecondaryText='Ok';
    this.buttonPrimaryText='';
  }

  onAddVessel() {
  }

  onSelectVessel(index: number) {

    this.selectedVessel = this.vessels[index];
    this.selectedIndex = index;
  }

  onShowFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }

}
