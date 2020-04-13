import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToDo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  endpoint: string = `http://localhost:4000`;
  headers = new HttpHeaders().set('ContentType', 'application/json');
  todos: ToDo[];

  constructor(private http: HttpClient) {
    this.todos = [
      new ToDo({id: 1, title: 'Einkaufszettel', fullText: '2 Eier, 3 Äpfel, 5 Liter Milch'}), 
      new ToDo({id: 2, title: 'Projekte', fullText: 'Felix misc app, AI Techlabs, Dota 2 Analytics'})
    ]
   }

  getTodos(): Observable<any> {
    /*     const API_URL = `${this.endpoint}/get-todos`;
    return this.http.get(API_URL).pipe(
      catchError(this.errorMgmt)
      ); */
    return of(this.todos)
  }

  addTodo(): Observable<any> {
    let id: number;
    if (this.todos.length === 0) {
      id = 0;
    } else {
      id = this.todos[this.todos.length - 1].id + 1;
    }
    const todo: ToDo = new ToDo({id: id});
    this.todos.push(todo)
    return of(todo)
  }

  editTodo(todoChange: ToDo) {
    if (this.todos.length > 0) {
      let found: boolean = false;
      let i: number = 0;
      while (! found) {
        if (todoChange.id === this.todos[i].id) {
          found = true;
          this.todos[i] = todoChange;
        }
        found = i === this.todos.length ? true : false;
      }
    }
  }

  getTodo(id): Observable<any> {
/*     const API_URL = `${this.endpoint}/get-todo/${id}`;
    return this.http.get(API_URL).pipe(
      map((res: Response) => {
        return new ToDo(res);
      }),
      catchError(this.errorMgmt)
    ); */
    let i = null;
    this.todos.forEach((value, index) => {
      if (id === value.id) {
        i = index;
      }
    });
    if (i === null) {
      return of({status: 'error', message: 'ToDo id could not be found'});
    } else {
      return of(this.todos[i]);
    }
  }

  deleteTodo(id) {
    let i: number = null;
    this.todos.forEach((value, index) => {
      if (id === value.id) {
        i = index;
      }
    });
    console.log("deleteToDo service");
    this.todos.splice(i, 1);
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
