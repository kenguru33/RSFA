import {VesselsComponent} from "./vessels.component";
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {VesselsDetailComponent} from "./vessels-detail/vessels-detail.component";
import {VesselsDetailEditComponent} from "./vessels-detail/vessels-detail-edit.component";
import {LoginGuard} from "../shared/login.guard";

const vesselsRoutes: Routes = [
    {
        path: 'fartøyer', component: VesselsComponent, canActivate:[LoginGuard],
        children: [
            { path: 'edit',  component: VesselsDetailEditComponent },
            { path: 'edit/:key',  component: VesselsDetailEditComponent },
            { path: ':key',  component: VesselsDetailComponent},
            { path: '', component: VesselsDetailComponent }
        ]
    }
];

export const vesselsRouting: ModuleWithProviders = RouterModule.forChild(vesselsRoutes);
