import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { CountriesComponent } from './countries/countries.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
      ModulesRoutingModule,
      CommonModule,
      SharedModule,
      ReactiveFormsModule
    ],
    exports: [
      SharedModule
    ],
    providers: [
    ],
    declarations: [
      CountriesComponent,
        CountriesListComponent
    ]
  })
  export class ModulesModule { }
