import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounntryCatalogsService } from './services/country-catalogs.service';
import { CountryPopupComponent } from '../shared/components/country-popup/country-popup.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CountryPopupComponent
    ],
    exports: [
        CountryPopupComponent
    ],
    providers: [
        CounntryCatalogsService
    ],
})
export class SharedModule { }
