import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {StationsComponent} from "./stations.component";
import {StationsDetailComponent} from "./stations-detail/stations-detail.component";
import {StationsDetailEditComponent} from "./stations-detail/stations-detail-edit.component";
const vesselsRoutes: Routes = [
  {
    path: 'stasjoner',
    component: StationsComponent,
    children: [
      { path: 'edit', component: StationsDetailEditComponent},
      { path: 'edit/:key',  component: StationsDetailEditComponent },
      { path: ':key',  component: StationsDetailComponent},
    ]
  }
];

export const stationsRouting: ModuleWithProviders = RouterModule.forChild(vesselsRoutes);
