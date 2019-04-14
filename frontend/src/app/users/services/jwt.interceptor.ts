import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.store.selectSnapshot(state => state.auth);

    if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
