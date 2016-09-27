import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {StationsComponent} from "./stations.component";
const vesselsRoutes: Routes = [
  {
    path: 'stasjoner',
    component: StationsComponent,
    children: [
      //{ path: 'edit',  component: VesselClassDetailEditComponent },
      //{ path: 'edit/:key',  component: VesselClassDetailEditComponent },
      //{ path: ':key',  component: VesselClassDetailComponent},
    ]
  }
];

export const stationsRouting: ModuleWithProviders = RouterModule.forChild(vesselsRoutes);
