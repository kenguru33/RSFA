import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2baPaginationComponent } from './ng2ba-pagination.component';
import { Ng2baPaginationPipe } from './ng2ba-pagination.pipe';
import {Ng2baPaginationService} from "./ng2ba-pagination.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Ng2baPaginationComponent,
    Ng2baPaginationPipe
  ],
  exports: [
    Ng2baPaginationComponent,
    Ng2baPaginationPipe
  ],
  providers: [
    Ng2baPaginationService
  ]
})
export class Ng2baPaginationModule { }
