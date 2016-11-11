import { Component, OnInit } from '@angular/core';
import {VesselClassesService} from "../vessel-classes.service";
import {VesselsService} from "../../vessels/vessels.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vessel-classes-detail-edit',
  templateUrl: './vessel-classes-detail-edit.component.html',
  styleUrls: ['./vessel-classes-detail.component.css']
})
export class VesselClassesDetailEditComponent implements OnInit {

  page: number = 1;

  isLoading: boolean;

  constructor(private vesselsClassesService: VesselClassesService, private vesselsService: VesselsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }

}
