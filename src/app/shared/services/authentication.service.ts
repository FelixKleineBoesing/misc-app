import { Injectable } from '@angular/core';
import { User } from '../user';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private endpoint = `${environment.backend_port}user`;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  loginUser(username: string, password: string): Observable<object> {
    return this.http.post<any>(`${this.endpoint}/login`, { username, password }).pipe(
      map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logoutUser(): void {
    if (this.currentUserValue == null) {
      return;
    }
    this.http.post<any>(`${this.endpoint}/logout`, this.currentUserValue).toPromise().then(val => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    });
  }
}
