import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private router: Router
    ) {}

    canActivate(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): boolean | UrlTree {
        const token = this.tokenService.get();
        if (token && this.tokenService.isTokenValid()) {
            if (state.url === '/') {
                if (this.tokenService.hasDash()) {
                    return this.router.parseUrl('/dashboard/dashboard');
                } else if (this.tokenService.hasService()) {
                 //   return this.router.parseUrl('/servico/servicos');
                } else if (this.tokenService.hasFinance()) {
                  //  return this.router.parseUrl('/financeiro/contas-pagar');
                } else {
                    return this.router.parseUrl('/auth/login');
                }
            }
            return true; // Permite acessar outras rotas protegidas
        }

        this.tokenService.remove();
        return this.router.parseUrl('/auth/login');
    }
}
