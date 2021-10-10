import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-country-popup',
  templateUrl: './country-popup.component.html',
  styleUrls: ['./country-popup.component.sass']
})
export class CountryPopupComponent implements OnInit {

  @Input() country: any={};
  @Input() countriesList=  new Map<string,[]>();

  constructor() { }

  ngOnInit(): void {
  }

  getBorders(borders:[]): string{
    let border='';
    this.countriesList.forEach((value: [], key: string) => {
      for(let country of value){
        if(borders.includes(country['cioc'])){
          if(border!==''){
            border+=', ';
          }
          border+=country['name']['common'];
        }
      }
    });
    if(border===''){
      border='N/A';
    }
    return border;
  }

  close(){
    document.body.style.overflow='auto';
    this.country={};
  }

}
