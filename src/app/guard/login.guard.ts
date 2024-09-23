import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../shared/services/token.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { UtilToolsService } from '../shared/services/util-tools.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  flagLog: boolean = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private utilToolsService: UtilToolsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  //Si el usuario esta logeado pero intenta acceder a la vista de Login se le redirige a Home (Index)
  //Es un guard simple que verifica si el usuario esta logeado: comunmente usado en Login/Register
  //Se indica en Routing
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("-------------------------Inicio can Activate Login")
    console.log('Esta es la ruta/////////////////////');
    console.log(route);
    console.log(route.url[0].path);
    
    this.flagLog = this.tokenService.isLogged();

    if (this.flagLog) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}