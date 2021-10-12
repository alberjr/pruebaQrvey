import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPopupComponent } from './country-popup.component';
import { CountryDescPopup } from 'src/app/shared/entities/country-desc-popup';

describe('CountryPopupComponent', () => {
  let component: CountryPopupComponent;
  let fixture: ComponentFixture<CountryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should close()', () => {
    component.country= new CountryDescPopup();
    expect(component.close()).toBeUndefined();
  });

  it('should setFavorite()', () => {
    const country='colombia';
    expect(component.setFavorite('country')).toBeUndefined();
  });
});
