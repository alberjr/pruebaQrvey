import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { parametros } from 'src/app/shared/constants/parameters';

/**
 * Prefixes all requests with Headers
 */
@Injectable()
export class ApiHeadersInterceptor implements HttpInterceptor {

    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headersApi = new HttpHeaders()
            .append('System-Id', 'prueba-alber')
            .append('Content-Type', 'application/json')
            .append('Message-Id', 'prueba-alber')
        request = request.clone({ headers: headersApi });
        return next.handle(request);
    }
}
