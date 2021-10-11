import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { CountryDescPopup } from 'src/app/shared/entities/country-desc-popup';

@Component({
  selector: 'app-country-popup',
  templateUrl: './country-popup.component.html',
  styleUrls: ['./country-popup.component.sass']
})
export class CountryPopupComponent implements OnInit {

  @Input()  country!: CountryDescPopup;
  @Output() favorite=  new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  close(){
    document.body.style.overflow='auto';
    this.country.setShowPop(false);
  }
  setFavorite(favorite: string){
    this.favorite.emit(favorite.toLowerCase());
  }

}
