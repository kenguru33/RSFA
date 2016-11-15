import {Component, OnInit, Input} from '@angular/core';
import {VesselClassesService} from "../vessel-classes.service";
import {VesselClass} from "../models/vessel-class";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'rs-vessel-classes-list',
  templateUrl: './vessel-classes-list.component.html',
  styleUrls: ['./vessel-classes-list.component.css']
})
export class VesselClassesListComponent implements OnInit {
  private showDialog = false;
  private dialogMessage = '';
  private dialogTitle = '';
  private buttonPrimaryText = '';
  private buttonSecondaryText = '';

  @Input() private isLoading;

  vesselClasses = [];
  private selectedVesselClass;
  private selectedIndex;

  vesselClassesChangedSubscription: Subscription;

  constructor(private vesselClassesService: VesselClassesService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.vesselClassesChangedSubscription = this.vesselClassesService.vesselClassListChanged.subscribe(key=>{
      this.getVesselClasses();
    });
    this.getVesselClasses();
  }

  private getVesselClasses() {
    this.vesselClassesService.getVesselClasses().subscribe((vesselClasses: VesselClass[]) => {
      this.isLoading = true;
      this.vesselClasses = vesselClasses;
      this.isLoading = false;
    })
  }

  onAddVesselClass() {
    console.log('add vessel class')
  }

  onVesselClassSelected(key: string) {

    this.selectedVesselClass = this.vesselClasses.find(station=>station.key === key);
    this.selectedIndex = this.vesselClasses.findIndex(station=>station.key === key);
  }

  private deleteVesselClass(value: boolean) {
    this.showDialog = false;
    if (!value) return;
    let index = this.vesselClasses.indexOf(this.selectedVesselClass);
    this.vesselClassesService.deleteVesselClass(this.selectedVesselClass).subscribe(()=>{
      console.log('we have a successfull deletion');
      this.vesselClasses.splice(index,1);
      this.selectedIndex = null;
      this.selectedVesselClass = null;
      this.getVesselClasses();
      this.router.navigate(['klasser']);
    },error => {
      if (error.status === 401) {
        localStorage.removeItem('userToken');
        this.router.navigate(['/logginn']);
      }
    });
  }

  onDeleteVesselClass(key: string) {

    if (key) {
      this.selectedVesselClass = this.vesselClasses.find(vessel=>vessel.key === key);
      this.selectedIndex = this.vesselClasses.findIndex(vessel=>vessel.key === key);
    }
    this.showDialogBox('Slette ' + this.selectedVesselClass.id + '-' + this.selectedVesselClass.name + '?');
  }

  private showDialogBox(message: string) {
    this.dialogTitle = '';
    this.dialogMessage = message;
    this.showDialog = true;
  }
}
