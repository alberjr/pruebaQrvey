import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

import { HttpService } from './http.service';
import { ErrorHandlerInterceptor } from '../interceptors/error-handler.interceptor';
import { ApiPrefixInterceptor } from '../interceptors/api-prefix.interceptor';

describe('HttpService', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let interceptors: HttpInterceptor[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorHandlerInterceptor,
        ApiPrefixInterceptor,
        {
          provide: HttpClient,
          useClass: HttpService
        }
      ]
    });

    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);

    const realRequest = http.request;
    spyOn(HttpService.prototype, 'request').and.callFake(
      function(this: any, method: string, url: string, options?: any) {
        interceptors = this.interceptors;
        return realRequest.call(this, method, url, options);
      }
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

});
