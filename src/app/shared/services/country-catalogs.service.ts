import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { map, catchError, timeout, retryWhen, delay, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { parametros } from '../constants/parameters';

@Injectable()
export class CounntryCatalogsService {

    private endpoint = environment.serverUrl;
    private failuresNum = 0;
    
    constructor(
        private httpClient: HttpClient) {
    }

    getCountries(): Observable<[]> {
        const url = this.endpoint + parametros.countryService;    

        return this.httpClient.get<[]>(url)
        .pipe(
            timeout(parametros.timeoutGeneric),
            retryWhen(errors => errors.pipe(
                delay(parametros.delayGeneric),
                take(parametros.numRetriesServices),
                tap(response => {
                    if (response.status) {
                        if ((response.status + '').startsWith('5') ||
                            (response.status + '').startsWith('4')) {
                            if ((response.status + '').startsWith('4')) {
                                this.failuresNum = parametros.numRetriesServices;
                            } else {
                                this.failuresNum++;
                            }
                            if (this.failuresNum >= parametros.numRetriesServices) {
                                throw response;
                            }
                        }
                    }
                })
            )),
            map((result) => {
                return  result;
            }),
            catchError(this.handleError)
        );
    }

    handleError(error: any) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
     }
}