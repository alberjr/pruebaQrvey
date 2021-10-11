import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { HttpService } from './http/http.service';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { ApiPrefixInterceptor, ApiHeadersInterceptor } from './interceptors';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    ApiPrefixInterceptor,
    ApiHeadersInterceptor,
    ErrorHandlerInterceptor,
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}