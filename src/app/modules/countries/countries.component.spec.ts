import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CountriesComponent } from './countries.component';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({
      textShearch: '',
      filter: ''
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializeForm()', () => {
    expect(component.initializeForm()).toBeUndefined();
  });

  it('should onChangeSelect()', () => {
    const filter={target: {value: ''}};
    expect(component.onChangeSelect(filter)).toBeUndefined();
  });

  it('should setFilter()', () => {
    expect(component.setFilter()).toBeUndefined();
  });

  it('should getFilter()', () => {
    expect(component.getFilter([])).toBeUndefined();
  });
});
