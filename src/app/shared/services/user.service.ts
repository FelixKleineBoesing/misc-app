import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint = `${environment.backend_port}user`;

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    console.log(user);
    this.http.post<any>(`${this.endpoint}/register`, user).subscribe(val => {
      const createdUser = val;
      console.log(createdUser);
    });
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.endpoint}`);
  }

  isAllowed(route: ActivatedRouteSnapshot): boolean {
    // backend should return whether the route is allowed for the user role
    console.log(route);
    console.log('isAllowed');
    return true;
  }

  removeUser(userID: string) {
    return this.http.delete(`${this.endpoint}/${userID}`);
  }

}
