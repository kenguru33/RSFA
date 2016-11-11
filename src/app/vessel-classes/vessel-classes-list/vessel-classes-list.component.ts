import { Component, OnInit } from '@angular/core';
import {VesselClassesService} from "../vessel-classes.service";

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

  private isLoading;

  vesselClasses = [];
  private selectedVesselClass;
  private selectedIndex;

  constructor(private vesselClassesService: VesselClassesService) { }

  ngOnInit() {
    this.vesselClassesService.getVesselClasses().subscribe((vesselClasses) => {
      this.vesselClasses = vesselClasses;
      console.log(vesselClasses)
    })
  }

  onAddVesselClass() {
    console.log('add vessel class')
  }

  onVesselClassSelected(key: string) {

    this.selectedVesselClass = this.vesselClasses.find(station=>station.key === key);
    this.selectedIndex = this.vesselClasses.findIndex(station=>station.key);
  }

}
