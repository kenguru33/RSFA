import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {StationsService} from "../stations.service";
import {Station} from "../models/station";
import {Location} from "@angular/common";

@Component({
  selector: 'app-stations-detail-edit',
  templateUrl: './stations-detail-edit.component.html',
  styleUrls: ['./stations-detail-edit.component.css']
})
export class StationsDetailEditComponent implements OnInit {

  activatedRouteSubscription: Subscription;
  private station: Station;
  isLoading = true;
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private stationsService: StationsService,
              private location: Location,
              private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['key']) {
        this.stationsService.getStation(params['key']).subscribe(station=>{
          this.station = station;
          this.editMode = true;
          this.isLoading = false;
        })
      } else {
        console.log('jepp create new');
        this.station = new Station();
        this.editMode = false;
        this.isLoading = false;
      }
    });
  }

  onSubmit(station: Station) {
    if (this.editMode) {
      this.stationsService.updateStation(this.station).subscribe((key: string) => {
        this.router.navigate(['stasjoner', key]);
      }, error => {
        console.log(error);
      });
    } else {
      this.stationsService.storeStation(station).subscribe((key: string) => {
        this.router.navigate(['stasjoner', key]);
      }, error => {
        console.log(error);
      });
    }

  }

  onCancel() {
    this.location.back();
  }

}
