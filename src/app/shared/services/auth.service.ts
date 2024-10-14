import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegisterUserDto } from '../../pages/auth/interfaces/register-user-dto';
import { Observable } from 'rxjs';
import { LoginUserDto } from '../../pages/auth/interfaces/login-user-dto';
import { TokenUserDto } from '../../pages/auth/interfaces/token-user-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.urlAddress;

  constructor(private httpClient: HttpClient) { }

  public registerUser(userRegisterDto: RegisterUserDto): Observable<RegisterUserDto> {
    const url = `${this.url}/api/auth/signup`;

    return this.httpClient.post<RegisterUserDto>(url, userRegisterDto);
  }

  public loginUser(userLoginDto: LoginUserDto): Observable<TokenUserDto> {
    const url = `${this.url}/api/auth/login`;

    return this.httpClient.post<TokenUserDto>(url, userLoginDto);
  }

  public refresh(jwtDto: TokenUserDto): Observable<TokenUserDto>{
    const url =  `${this.url}/api/auth/refresh-token`;
    return this.httpClient.post<TokenUserDto>(url, jwtDto);
  }
}
