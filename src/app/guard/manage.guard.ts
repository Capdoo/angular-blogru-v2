import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ManageGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  //Si el usuario esta logeado pero intenta acceder a la vista de Login se le redirige a Home (Index)
  //Es un guard simple que verifica si el usuario esta logeado: comunmente usado en Login/Register
  //Se indica en Routing
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    const flagLogged = await this.tokenService.isLogged();

    if (flagLogged) {
      this.router.createUrlTree(['/home']);
      return false;
    } else {
      return true;
    }
    
  }

}
