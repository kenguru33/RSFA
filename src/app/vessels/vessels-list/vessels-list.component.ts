import {Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {VesselsService} from "../vessels.service";
import {Vessel} from "../models/vessel.model";
import {Subscription} from "rxjs";
@Component({
  selector: 'rs-vessels-list',
  templateUrl: 'vessels-list.component.html',
  styleUrls: ['vessels-list.component.css']
})
export class VesselsListComponent implements OnInit, OnDestroy {

  private vessels: Vessel[] = [];

  private selectedVessel: Vessel;
  private selectedIndex: number;
    //private selectedVesselKey: any;

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

  private vesselsLoading;

    private sub: Subscription;

  constructor(private vesselsService: VesselsService, private router: Router) {}

  ngOnInit(): void {
      this.sub = this.vesselsService.vesselListChanged.subscribe( key => {
          console.log(key);
          this.getVessels();
      });
      this.getVessels();
  }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

  private getVessels() {
    this.vesselsLoading = true;
    this.vesselsService.getVessels().subscribe(vessels => {
      this.vessels = vessels;
      this.vesselsLoading = false;
    }, error => {
      console.error(error);
    })
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
      console.log(error);
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
    //this.addVessel({key: 0 , id: 150, prefix:'rs', name: 'rumpebalja ratata'});
  }

  onSelectVessel(index: number) {

    this.selectedVessel = this.vessels[index];
      this.selectedIndex = index;
    //this.selectedVesselKey = this.selectedVessel.key;
    //console.log('navigating to: /skøyte/'+this.selectedVesselId);
    //this.router.navigate(['/skøyter', +this.selectedVesselId ]);

    //console.log('vessel selected', this.selectedVessel);
  }

  onShowFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }
}