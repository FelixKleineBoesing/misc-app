import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToDo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  endpoint: string = `http://localhost:4000/api`;
  headers = new HttpHeaders().set('ContentType', 'application/json');
  todos: ToDo[];

  constructor(private http: HttpClient) {
    this.todos = [
      new ToDo({id: 1, title: 'Einkaufszettel', fullText: '2 Eier, 3 Äpfel, 5 Liter Milch'}), 
      new ToDo({id: 2, title: 'Projekte', fullText: 'Felix misc app, AI Techlabs, Dota 2 Analytics'})
    ]
   }

  getTodos(): Observable<any> {
    const API_URL = `${this.endpoint}/get-todos`;
    return this.http.get(API_URL).pipe(
      catchError(this.errorMgmt)
      );
  }

  addTodo(): Observable<any> {
    const todo: ToDo = new ToDo({});
    const API_URL = `${this.endpoint}/add-todo`;
    return this.http.post(API_URL, todo).pipe(
      catchError(this.errorMgmt)
    );
  }

  editTodo(todoChange: ToDo): Observable<any> {
    const API_URL = `${this.endpoint}/update-todo/${todoChange._id}`;
    return this.http.put(API_URL, todoChange).pipe(
      catchError(this.errorMgmt)
    );
  }

  getTodo(id: string): Observable<any> {
    const API_URL = `${this.endpoint}/get-todo/${id}`;
    return this.http.get(API_URL).pipe(
      map((res: Response) => {
        return new ToDo(res);
      }),
      catchError(this.errorMgmt)
    );
  }

  deleteTodo(id: string): Observable<any> {
    const API_URL = `${this.endpoint}/delete-todo/${id}`;
    return this.http.delete(API_URL).pipe(
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
