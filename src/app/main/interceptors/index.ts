import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RandomHeaderInterceptor } from './random-header.interceptor';

export const HTTP_INTERCEPTOR_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RandomHeaderInterceptor,
    multi: true,
  },
];
