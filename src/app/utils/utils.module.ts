import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

const utilsModules = [
  CommonModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatTableModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule
];

@NgModule({
  declarations: [],
  imports: utilsModules,
  exports: utilsModules
})
export class UtilsModule {
}
