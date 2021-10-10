import { Component, OnInit } from '@angular/core';
import { CounntryCatalogsService } from 'src/app/shared/services/country-catalogs.service';
import {  finalize, map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.sass']
})
export class CountriesComponent implements OnInit {
  form: FormGroup|any;

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
    private formBuilder: FormBuilder,
    private counntryCatalogsService: CounntryCatalogsService
    ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getCountries();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      textShearch: [''],
      filter: ['']
    });
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
            this.countriesList=resp;
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
  onChangeSelect(event: any){
    this.form.controls.filter.setValue(event.target.value);
  }

  setFilter(textShearch:FormControl, filter: FormControl){
    if (this.formControlValid(textShearch) &&
        this.formControlValid(filter)
    ) { 
      if(filter.value==='Favorites'){
        this.filterByFavorite(textShearch.value);
      }else{
        if(filter.value===''){
          this.countriesListFiltered= new Map(this.countriesListGroupBy);  
          console.log(this.countriesListFiltered);
        }else{
          this.filterByContinent(filter.value,textShearch.value);
        }
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

  getErrorMessage(control: any) {
    if (control.hasError('required')) {
      return 'El campo debe ser diligenciado';
    } else if (control.hasError('minlength')) {
      return 'El mínimo de digitos son ' + (control.errors.minlength.requiredLength - 1);
    } else {
      return 'El campo no cumple con un formato válido';
    }
  }

  formControlValid(control: FormControl) {
    if (control.valid) {
      return true;
    }
    control.markAsTouched();
    return false;
  }


}
