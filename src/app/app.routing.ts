import {RouterModule, Routes} from "@angular/router";
import {VesselsComponent} from "./vessels/vessels.component";
import {ModuleWithProviders} from "@angular/core";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {VesselClassesComponent} from "./vessel-classes/vessel-classes.component";
import {StationsComponent} from "./stations/stations.component";
import {LoginGuard} from "./shared/login.guard";


const appRoutes: Routes = [
  { path: '', redirectTo: 'logginn', pathMatch: 'full'},
  { path: 'logginn', component: LoginComponent},
  { path: 'skøyter', component: VesselsComponent, canActivate:[LoginGuard]},
  { path: 'klasser', component: VesselClassesComponent},
  { path: 'stasjoner', component: StationsComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
