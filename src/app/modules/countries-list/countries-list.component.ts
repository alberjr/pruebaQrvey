import { Component, OnInit, Input } from '@angular/core';
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
  @Input() events!: Observable<void>;
  @Input()  textShearch!: string;
  @Input() filter!: string;
  countrySelected= new CountryDescPopup();
  countriesList= [];
  countriesListGroupBy= new Map<string,[]>();
  countriesListFiltered= new Map<string,[]>();
  shearchFilter= [
                  {code: '' , name:'Show All'},
                  {code: 'Favorites' , name:'Favorites'},
                  {code: 'Africa' , name:'Africa'},
                  {code: 'Americas' , name:'America'},
                  {code: 'Asia' , name:'Asia'},
                  {code: 'Europe' , name:'Europe'},
                  {code: 'Oceania' , name:'Oceania'},
                  ];
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
          console.log(this.countriesListGroupBy);
        })
      )
      .subscribe((resp) => {
        if (resp !== undefined) {
          if (resp) {
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
          this.countriesListFiltered= new Map(this.countriesListGroupBy);  
          console.log(this.countriesListFiltered);
        }else{
          this.filterByContinent(filter,textShearch);
        }
      }

  }

  filterByContinent(continent: string, textShearch: any){    
    console.log(this.countriesListGroupBy);
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
      console.log(this.countriesListFiltered);
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
      console.log(key,values);
      if(values.length>0){
      this.countriesListFiltered.set(key,values);
      }
  })
      console.log(this.countriesListFiltered);
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
    desc+=country['region']?'Region: '+country['region']+' <br>':'';
    desc+=country['population']?'Population: '+country['population']+' <br>':'';      
    desc+=country['capital']?'Capital: '+country['capital'].join(', ')+' <br>':'';
    desc+=country['currencies']?'Currency: '+Object.values(country['currencies'])
          .map(function(elem: any){
            return elem['name'];
          }).join(', ')+' <br>':'';
    desc+=country['languages']?
          'Language: '+Object.values(country['languages']).join(', ')+' <br>':'';
    desc+=country['borders']?'Border Countries: '+this.getBorders(country['borders'])+' <br>':'';
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
