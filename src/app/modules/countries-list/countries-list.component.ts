import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.sass']
})
export class CountriesListComponent implements OnInit {

  @Input() countriesList=  new Map<string,[]>();
  @Input() favoriteList: string []=  [];

  countrySelected: any={};

  constructor() { }

  ngOnInit(): void {
    console.log(this.countriesList);
  }

  showInformation(val: any, key: any){
    document.body.style.overflow='hidden';
    this.countrySelected= this.countriesList.get(key)?.filter(
      country =>
      (''+country['name']['common']).toLowerCase( )=== val.toLowerCase( )
    )[0];
    console.log(this.countrySelected);
  }

}
