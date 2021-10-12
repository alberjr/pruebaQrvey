import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.sass']
})
export class CountriesComponent implements OnInit {
  form: FormGroup|any;
  eventsSubject: Subject<void> = new Subject<void>();
  shearchFilter= [
                  {code: '' , name:'Show All'},
                  {code: 'Favorites' , name:'Favorites'}
                  ];

  constructor(
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      textShearch: [''],
      filter: ['']
    });
  }
  onChangeSelect(event: any){
    this.form.controls.filter.setValue(event.target.value);
  }
  setFilter(){
    this.eventsSubject.next();
  }

  getFilter(event: []){
    this.shearchFilter=[
      {code: '' , name:'Show All'},
      {code: 'Favorites' , name:'Favorites'}];
      event.forEach(item=>this.shearchFilter.push({code: item , name: item}));
  }


}
