import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  endpoint: string = `http://localhost:4000`;
  headers = new HttpHeaders().set('ContentType', 'application/json');

  constructor(private http: HttpClient) { }

  GetTodos(): Observable<any> {
    let API_URL = `${this.endpoint}/get-todos`;
    return this.http.get(API_URL).pipe(
      catchError(this.errorMgmt)
    );
  }

  GetTodo(id): Observable<any> {
    let API_URL = `${this.endpoint}/get-todo/${id}`;
    return this.http.get(API_URL).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    );

  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
