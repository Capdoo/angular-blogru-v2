import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../shared/services/token.service';


@Injectable({
  providedIn: 'root'
})

// Para el acceso de rutas dentro del front, es necesario tener token y roles
export class ResourceGuard implements CanActivate {

  //Es el rol real que se tiene como: User o Admin
  realRol!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("-------------------------Inicio can Activate Resource")
    //Es el rol que se espera para acceder a la ruta
    //Se indica en Routing
    console.log('Esta es la ruta! ResourceGuard');
    console.log(route);
    console.log(route.url[0].path);

    const expectedRol = route.data['expectedRol'];

    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'user';

    //Verifica si existe un token (primero)
    //Verifica si el rol esperado es el que yo tengo
    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {
      this.router.navigate(['/site']);
      console.log("-------------------------Exited by Resource Guard");
      return false;
    }

    console.log("-------------------------Can by Resource Guard");
    return true;
  }
}
