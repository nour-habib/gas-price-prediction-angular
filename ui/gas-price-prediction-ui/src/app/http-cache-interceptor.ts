import { HttpInterceptor, HttpResponse, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { tap } from "rxjs";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    dataAPI = 'http://localhost:3000/data';
    modelAPI = 'http://localhost:3000/model-results';

    private cache = new Map<string, HttpResponse<any>>();
     private endpointsToCache = new Set([
        this.dataAPI,
        this.modelAPI
     ]);

     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const url = request.url.replace(this.dataAPI, '');

        if(this.endpointsToCache.has(url)){
            const cachedResponse = this.cache.get(request.url);

            if(cachedResponse) {
                return of(cachedResponse);
            }

            return next.handle(request).pipe(
                tap((response) => {
                    if(response instanceof HttpResponse) {
                        this.cache.set(request.url, response);
                    }
                })
            );
        }
        return next.handle(request);
     }
}