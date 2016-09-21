import {VesselsComponent} from "./vessels.component";
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {VesselsDetailComponent} from "./vessels-detail/vessels-detail.component";
import {VesselsDetailEditComponent} from "./vessels-detail/vessels-detail-edit.component";
//import {VesselDetailComponent} from "./vessels-details/vessel-detail.component";
//import {VesselDetailStarterComponent} from "./vessels-details/vessel-detail-starter.component";
//import {VesselEditComponent} from "./vessels-details/vessel-detail-edit.component";

const vesselsRoutes: Routes = [
    {
        path: 'skøyter',
        component: VesselsComponent,
        children: [
            { path: 'edit',  component: VesselsDetailEditComponent },
            { path: 'edit/:key',  component: VesselsDetailEditComponent },
            { path: ':key',  component: VesselsDetailComponent},
            //{ path: '*', component: VesselDetailStarterComponent }
        ]
    }
];

export const vesselsRouting: ModuleWithProviders = RouterModule.forChild(vesselsRoutes);