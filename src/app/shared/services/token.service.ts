import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const REFRESH_TOKEN = 'RefreshToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(private router:Router) { }

  public setToken(token: string): void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public setRefreshToken(token: string): void{
    window.localStorage.removeItem(REFRESH_TOKEN);
    window.localStorage.setItem(REFRESH_TOKEN, token);
  }

  public getToken(): string | null{
    if (typeof window !== 'undefined' && window.localStorage) {
      // Safe to use localStorage
      return localStorage.getItem(TOKEN_KEY);
    } else {
      return null;
    }

  }

  public getRefreshToken(): string | null{
    if (typeof window !== 'undefined' && window.localStorage) {
      // Safe to use localStorage
      return localStorage.getItem(REFRESH_TOKEN);
    } else {
      return null;
    }

  }

  public isLogged() {
    return this.getToken() == null ? false : true;
  }

  public getUsername(): string | null{
    if (!this.isLogged()) return null;
    const payload = this.getToken()!.split('.')[1];
    const payload_decoded = atob(payload!);
    const values = JSON.parse(payload_decoded);
    const username = values.sub;
    return username;
  }

  public getUsernameV2(): string | null{
    if (!this.isLogged()) return null;
    const payload = this.getToken()!.split('.')[1];
    const payload_decoded = atob(payload!);
    const values = JSON.parse(payload_decoded);
    const username = values.username;
    return username;
  }

  public isAdmin(): boolean{
    if (!this.isLogged()) return false;
    const payload = this.getToken()?.split('.')[1];
    const payload_decoded = atob(payload!);
    const values = JSON.parse(payload_decoded);
    const roles = values.roles;
    return roles.indexOf('ROLE_ADMIN') < 0 ? false : true;
  }

  public logOut(): void{
    window.localStorage.clear();
    // this.router.navigate(['/login']);
  }
}
