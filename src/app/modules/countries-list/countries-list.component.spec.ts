import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounntryCatalogsService } from 'src/app/shared/services/country-catalogs.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { CountriesListComponent } from './countries-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  Observable,Subscription} from 'rxjs';
import { of } from 'rxjs';

describe('CountriesListComponent', () => {
  let component: CountriesListComponent;
  let fixture: ComponentFixture<CountriesListComponent>;
  let counntryCatalogsService: CounntryCatalogsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesListComponent ],
      providers: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        SharedModule
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesListComponent);
    component = fixture.componentInstance;
    counntryCatalogsService = TestBed.get(CounntryCatalogsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.events=new Observable<void>();
    expect(component).toBeTruthy();
  });

  it('should getCountries 200', () => {
    const resp = {
      status: 200,
      body: []
    };

    const spyCounntryCatalogsService = spyOn(counntryCatalogsService, 'getCountries').and.returnValue(of(resp));
    const spy = spyOn(component, 'sortCountries');
    component.getCountries();
    expect(spyCounntryCatalogsService).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should getCountries 500', () => {
    const resp = {
      status: 500,
      body: []
    };

    const spyCounntryCatalogsService = spyOn(counntryCatalogsService, 'getCountries').and.returnValue(of(resp));
    const spy = spyOn(component, 'sortCountries');
    component.getCountries();
    expect(spyCounntryCatalogsService).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should getCountries undefined', () => {
    const resp = undefined;

    const spyCounntryCatalogsService = spyOn(counntryCatalogsService, 'getCountries').and.returnValue(of(resp));
    const spy = spyOn(component, 'sortCountries');
    component.getCountries();
    expect(spyCounntryCatalogsService).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should sortCountries', () => {
    expect(component.sortCountries()).toBeUndefined();
  });

  it('should setFilter filter=Favorites', () => {
    const filter='Favorites';
    const textShearch= '';
    const spy = spyOn(component, 'filterByFavorite');
    expect(component.setFilter(textShearch,filter)).toBeUndefined();
    expect(spy).toHaveBeenCalled();
  });

  it('should setFilter filter vacio', () => {
    const filter='';
    const textShearch= '';
    const spy = spyOn(component, 'filterByAll');
    expect(component.setFilter(textShearch,filter)).toBeUndefined();
    expect(spy).toHaveBeenCalled();
  });

  it('should setFilter filter continente', () => {
    const filter='africa';
    const textShearch= '';
    const spy = spyOn(component, 'filterByContinent');
    expect(component.setFilter(textShearch,filter)).toBeUndefined();
    expect(spy).toHaveBeenCalled();
  });

  it('should filterByAll', () => {
    const textShearch= '';
    expect(component.filterByAll(textShearch)).toBeUndefined();
  });

  it('should filterByContinent', () => {
    const continent= '';
    const textShearch= '';
    expect(component.filterByContinent(continent,textShearch)).toBeUndefined();
  });

  it('should filterByFavorite', () => {
    const textShearch= '';
    expect(component.filterByFavorite(textShearch)).toBeUndefined();
  });

  it('should groupBy', () => {
    const key= '';
    expect(component.groupBy([],key)).toBeDefined();
  });

  it('should getBorders', () => {
    expect(component.getBorders([])).toBeDefined();
  });

  it('should getCountrySelected', () => {
    const country={name:{common: ''},flags: ['']};
    expect(component.getCountrySelected(country)).toBeUndefined();
  });

  it('should favoriteOp', () => {
    const event='';
    expect(component.favoriteOp(event)).toBeUndefined();
  });


});
