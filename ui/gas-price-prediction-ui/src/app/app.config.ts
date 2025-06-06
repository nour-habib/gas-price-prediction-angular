import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { CacheInterceptor } from './http-cache-interceptor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync('noop'), provideAnimationsAsync(),provideHttpClient(withFetch())
  ],
};
  