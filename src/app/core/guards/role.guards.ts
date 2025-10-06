import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const allowedRoles = route.data['roles'] as string[];
    const token = this.tokenService.get();

    if (!token) {
      return this.router.parseUrl('/auth/login'); // fallback de segurança
    }

    const payload = this.tokenService.decode(); // assume que você tem isso
    const userRoles = payload?.roles || [];

    const hasAccess = allowedRoles.some(role => userRoles.includes(role));

    if (!hasAccess) {
      return this.router.parseUrl('/auth/access'); // ou notfound
    }

    return true;
  }
}
