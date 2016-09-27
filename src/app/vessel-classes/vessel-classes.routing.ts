import {Routes, RouterModule} from "@angular/router";
import {VesselClassesComponent} from "./vessel-classes.component";
import {ModuleWithProviders} from "@angular/core";
const vesselsRoutes: Routes = [
  {
    path: 'klasser',
    component: VesselClassesComponent,
    children: [
      //{ path: 'edit',  component: VesselClassDetailEditComponent },
      //{ path: 'edit/:key',  component: VesselClassDetailEditComponent },
      //{ path: ':key',  component: VesselClassDetailComponent},
    ]
  }
];

export const vesselClassesRouting: ModuleWithProviders = RouterModule.forChild(vesselsRoutes);
