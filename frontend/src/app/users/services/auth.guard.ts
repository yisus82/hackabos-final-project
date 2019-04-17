import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.store.selectSnapshot(state => state.auth);
    if (currentUser && currentUser.token) {
      return true;
    }

    this.router.navigate(['/reviews/list/1']);

    return false;
  }
}
