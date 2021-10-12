import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CounntryCatalogsService } from 'src/app/shared/services/country-catalogs.service';
import {  finalize } from 'rxjs/operators';
import {  Observable,Subscription} from 'rxjs';
import { CountryDescPopup } from 'src/app/shared/entities/country-desc-popup';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.sass']
})
export class CountriesListComponent implements OnInit {
  private eventsSubscription!: Subscription;
  @Input() events=new Observable<void>();
  @Input()  textShearch!: string;
  @Input() filter!: string;
  @Output() shearchFilter=  new EventEmitter();
  countrySelected= new CountryDescPopup();
  countriesList= [];
  countriesListGroupBy= new Map<string,[]>();
  countriesListFiltered= new Map<string,[]>();
  favoriteList= [ 'Cuba'.toLowerCase( ),'British Indian Ocean Territory'.toLowerCase( )
                ]
                  ;

  constructor(
    private counntryCatalogsService: CounntryCatalogsService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => this.setFilter(this.textShearch,this.filter));
    this.getCountries();
  }

  getCountries(){
    this.counntryCatalogsService.getCountries()
      .pipe(
        finalize(() => {
          this.sortCountries();
          this.countriesListGroupBy=this.groupBy(this.countriesList,'region');
          this.countriesListFiltered= this.countriesListGroupBy;
          this.shearchFilter.emit(Array.from(this.countriesListFiltered.keys()));
        })
      )
      .subscribe((resp) => {
        if (resp !== undefined) {
          if (resp.status==200) {
            this.countriesList=resp.body;
          }
        }
      });

  }

  sortCountries() {
    this.countriesList.sort(function (a, b) {
      const item1= a['region']+a['name']['common'];
      const item2= b['region']+b['name']['common'];
      if ( item1> item2 ) {
        return 1;
      }
      if (item1  < item2 ) {
        return -1;
      }
      return 0;
    });
  }
  
  setFilter(textShearch:string, filter: string){
      if(filter==='Favorites'){
        this.filterByFavorite(textShearch);
      }else{
        if(filter===''){
          this.filterByAll(textShearch);
        }else{
          this.filterByContinent(filter,textShearch);
        }
      }      
  }
  
  filterByAll(textShearch: string){ 
    this.countriesListFiltered=new Map();
    const countries= new Map(this.countriesListGroupBy);    
    countries.forEach((value: [], key: string) => {
      const values: any= value.filter(
        country => 
        (!textShearch || textShearch==='' || (''+country['name']['common']).toLowerCase( )
        .includes(textShearch.toLowerCase( )))
      );
      if(values.length>0){
      this.countriesListFiltered.set(key,values);
      }
  })
  }

  filterByContinent(continent: string, textShearch: any){  
    const map = this.countriesListGroupBy.get(continent);
    let values: any= [];
    if(map){
    values=map
    .filter(
      country => 
      (!continent || continent==='' ||country['region']===continent )
      && (!textShearch || textShearch==='' || (''+country['name']['common']).toLowerCase( )
      .includes(textShearch.toLowerCase( )))
    );
    }
    this.countriesListFiltered= new Map();
    this.countriesListFiltered.set(continent,values);
  }

  filterByFavorite(textShearch: string){ 
    this.countriesListFiltered=new Map();
    const countries= new Map(this.countriesListGroupBy);    
    countries.forEach((value: [], key: string) => {
      const values: any= value.filter(
        country => 
        this.favoriteList.includes((''+country['name']['common']).toLowerCase( )) 
        && (!textShearch || textShearch==='' || (''+country['name']['common']).toLowerCase( )
        .includes(textShearch.toLowerCase( )))
      );
      if(values.length>0){
      this.countriesListFiltered.set(key,values);
      }
  })
  }

  groupBy(countriesList: any[], keyField: string):Map<string,[]>{
    const result = new Map();
    countriesList.forEach((item)=>{
      const key = item[keyField];
      const mapKey = result.get(key);
      if(!mapKey){
        result.set(key,[item]);
      }else{
        mapKey.push(item);
      }
    });
    return result;
  }

  getBorders(borders:[]): string{
    let border='';
    this.countriesListGroupBy.forEach((value: [], key: string) => {
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

  getCountrySelected(country: any){
    
    this.countrySelected=new CountryDescPopup();
    this.countrySelected.setName(country['name']['common']);
    this.countrySelected.setFlag(country['flags'][0]);
    this.countrySelected.setFavorite(
      this.favoriteList.includes((country['name']['common']).toLowerCase( )) 
      );
    let desc='';
    desc+='Region: '+(country['region']?country['region']:'N/A')+' <br>';
    desc+='Population: '+(country['population']?country['population']:'N/A')+' <br>';      
    desc+='Capital: '+(country['capital']?country['capital'].join(', '):'N/A')+' <br>';
    desc+='Currency: '+(country['currencies']?Object.values(country['currencies'])
          .map(function(elem: any){
            return elem['name'];
          }).join(', '):'N/A')+' <br>';
    desc+='Language: '+(country['languages']?
      Object.values(country['languages']).join(', '):'N/A')+' <br>';
    desc+='Border Countries: '+(country['borders']?this.getBorders(country['borders']):'N/A')+' <br>';
    desc+='Flag:';
    this.countrySelected.setDesc(desc);
    this.countrySelected.setShowPop(true);

  }

  showInformation(val: any, key: any){
    document.body.style.overflow='hidden';
    const country= this.countriesListFiltered.get(key)?.filter(
      country =>
      (''+country['name']['common']).toLowerCase()=== val.toLowerCase()
    )[0];
    this.getCountrySelected(country);
  }

  favoriteOp(event: string){
    this.countrySelected.setFavorite(!this.countrySelected.getFavorite());
    this.favoriteList.includes(event)?
    this.favoriteList=this.favoriteList.filter(item => item !== event):
    this.favoriteList.push(event);
  }

}
