import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationComponent} from "./pagination.component";
import {PaginationPipe} from "./pagination.pipe";
import {PaginationService} from "./pagination.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginationComponent,
    PaginationPipe
  ],
  exports: [
    PaginationComponent,
    PaginationPipe
  ],
  providers: [
    PaginationService
  ]
})
export class PaginationModule { }
