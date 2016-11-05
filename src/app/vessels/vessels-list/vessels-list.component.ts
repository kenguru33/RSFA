import {
  Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Inject, Input, NgZone,
  ChangeDetectorRef
} from "@angular/core";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {VesselsService} from "../vessels.service";
import {Vessel} from "../models/vessel.model";
import {Subscription} from "rxjs";
import {Station} from "../../stations/models/station";
import {StationsService} from "../../stations/stations.service";
import {VesselStatusCode} from "../models/vessel-status-code";
import {UserService} from "../../user-manager/shared/services/user.service";
import {UserServiceToken} from "../../user-manager/shared/services/firebase/firebase-user.service";
import {timeout} from "rxjs/operator/timeout";

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

  @Input() private isLoading;

  private vesselChangedSubscription: Subscription;

  private vesselSearch ="";

  private page = 1;

  constructor(private vesselsService: VesselsService,
              private router: Router,
              @Inject(UserServiceToken) private userService: UserService,
              private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.vesselChangedSubscription = this.vesselsService.vesselListChanged.subscribe( () => {
      this.getVessels();
    });
    this.getVessels();
  }

  ngOnDestroy(): void {
    this.vesselChangedSubscription.unsubscribe();
  }
  getVessels() {

    if (this.userService.authenticated){
      this.isLoading = true;
      this.userService.token.then(token=>{
        this.vesselsService.getVessels().subscribe(vessels => {
          this.vessels = vessels;
          // TODO: Wrapped in a Zone. Hack to fix change detection not reacting.
          this.zone.run(()=>{this.isLoading = false;});
        }, error => {
          console.log('error code', error.status);
        });
      });

    } else {
      this.router.navigate(['logginn']).then(()=>{
        console.log("Are we navigating?");
      });
    }
  }

  private deleteVessel(value: boolean) {
    this.showDialog = false;
    if (!value) return;
    let index = this.vessels.indexOf(this.selectedVessel);
    this.vesselsService.deleteVessel(this.selectedVessel).subscribe(()=>{
      console.log('we have a successfull deletion');
      this.vessels.splice(index,1);
      this.selectedIndex = null;
      this.selectedVessel = null;
      this.getVessels();
      this.router.navigate(['fartøyer']);
    },error => {
      if (error.status === 401) {
        localStorage.removeItem('userToken');
        this.router.navigate(['/logginn']);
      }
    });
  }

  onDeleteVessel(key: string) {

    if (key) {
      this.selectedVessel = this.vessels.find(vessel=>vessel.key === key);
      this.selectedIndex = this.vessels.findIndex(vessel=>vessel.key === key);
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

  onSelectVessel(key: string) {

    this.selectedVessel = this.vessels.find(vessel=>vessel.key === key);
    this.selectedIndex = this.vessels.findIndex(vessel=>vessel.key);
  }

  onShowFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }

  onPageSelect(page: number) {
    // Hack to avoid change detection error.
    // https://www.bennadel.com/blog/3040-i-have-a-fundamental-misunderstanding-of-change-detection-in-angular-2-beta-8.htm
    setTimeout(()=> {this.page = page;},0);
  }


}
