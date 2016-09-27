import { Component, OnInit } from '@angular/core';
import {VesselClassesService} from "../vessel-classes.service";
import {VesselClass} from "../../vessels/models/vessel-class.model";

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

}
