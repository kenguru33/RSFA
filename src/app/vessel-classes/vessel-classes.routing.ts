import {Routes, RouterModule} from "@angular/router";
import {VesselClassesComponent} from "./vessel-classes.component";
import {ModuleWithProviders} from "@angular/core";
import {VesselClassesDetailComponent} from "./vessel-classes-detail/vessel-classes-detail.component";
import {VesselClassesDetailEditComponent} from "./vessel-classes-detail/vessel-classes-detail-edit.component";
const vesselsRoutes: Routes = [
  {
    path: 'klasser',
    component: VesselClassesComponent,
    children: [
      { path: 'edit',  component: VesselClassesDetailEditComponent },
      { path: 'edit/:key',  component: VesselClassesDetailEditComponent },
      { path: ':key',  component: VesselClassesDetailComponent},
      { path: '', component:VesselClassesDetailComponent}
    ]
  }
];

export const vesselClassesRouting: ModuleWithProviders = RouterModule.forChild(vesselsRoutes);
