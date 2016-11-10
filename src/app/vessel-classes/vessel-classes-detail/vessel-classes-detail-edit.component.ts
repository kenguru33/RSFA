import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vessel-classes-detail-edit',
  templateUrl: './vessel-classes-detail-edit.component.html',
  styles: []
})
export class VesselClassesDetailEditComponent implements OnInit {

  page: number = 1;

  isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
