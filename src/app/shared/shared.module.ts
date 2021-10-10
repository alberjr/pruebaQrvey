import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounntryCatalogsService } from './services/country-catalogs.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        CounntryCatalogsService
    ],
})
export class SharedModule { }
