import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payload } from './payload';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import { JwtAutResponse } from './JwtAutResponse';
import { RegisterPayload } from './registerpayload';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private url = 'http://localhost:8080/api/auth/';
  constructor(private httpClient: HttpClient, private localStoraqeService: LocalStorageService) { }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  login(loginPayload: Payload): Observable<boolean> {
    return this.httpClient.post<JwtAutResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      console.log(data)
      this.localStoraqeService.store('authenticationToken', data.authenticationToken);
      this.localStoraqeService.store('username', data.username);
      return true;
    }));
  }

  isAuthenticated(): boolean {
    return this.localStoraqeService.retrieve('username') != null;
  }

  logout() {
    const token = this.localStoraqeService.retrieve("authenticationToken");
    const token1 = this.localStoraqeService.retrieve("username");
    console.log(token, token1)
    this.localStoraqeService.clear('authenticationToken');
    this.localStoraqeService.clear('username');
    const token3 = this.localStoraqeService.retrieve("authenticationToken");
    const token4 = this.localStoraqeService.retrieve("username");
    console.log(token3, token4)
  }
}
