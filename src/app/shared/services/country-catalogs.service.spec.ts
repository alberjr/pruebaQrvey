import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CounntryCatalogsService } from './country-catalogs.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('CounntryCatalogsService', () => {
  let component: CounntryCatalogsService;
  let fixture: ComponentFixture<CounntryCatalogsService>;
  let counntryCatalogsService: CounntryCatalogsService;
  let httpTestingController: HttpTestingController;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      providers: [CounntryCatalogsService],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientTestingModule,
        SharedModule
        ]
    })
    .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [] } });;
    httpTestingController = TestBed.get(HttpTestingController);
    counntryCatalogsService = TestBed.get(CounntryCatalogsService);
    http = TestBed.get(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  
  it('validate getCountries() ', () => {
    expect(counntryCatalogsService.getCountries()).toBeDefined();
  });
});