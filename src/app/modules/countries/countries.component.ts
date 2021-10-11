import { Component, OnInit } from '@angular/core';
import { CounntryCatalogsService } from 'src/app/shared/services/country-catalogs.service';
import {Subject} from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
                  {code: 'Favorites' , name:'Favorites'},
                  {code: 'Africa' , name:'Africa'},
                  {code: 'Americas' , name:'America'},
                  {code: 'Asia' , name:'Asia'},
                  {code: 'Europe' , name:'Europe'},
                  {code: 'Oceania' , name:'Oceania'},
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
