import {Routes, RouterModule} from "@angular/router";
import {VesselClassesComponent} from "./vessel-classes.component";
import {ModuleWithProviders} from "@angular/core";
import {VesselClassesListComponent} from "./vessel-classes-list/vessel-classes-list.component";
const vesselsRoutes: Routes = [
  {
    path: 'klasser',
    component: VesselClassesComponent,
    children: [
      //{ path: 'edit',  component: VesselClassDetailEditComponent },
      //{ path: 'edit/:key',  component: VesselClassDetailEditComponent },
      //{ path: ':key',  component: VesselClassDetailComponent},
      //{ path: '', component:VesselClassesComponent}
    ]
  }
];

export const vesselClassesRouting: ModuleWithProviders = RouterModule.forChild(vesselsRoutes);
