import { Component, OnInit } from '@angular/core';
import { ToDo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: ToDo[];
  activeTodo: number;

  constructor(private todoApi: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    /* this.todoApi.GetTodos().subscribe(data => {
      this.todos = data;
    }); */
    this.todos = [
      new ToDo({id: 1, title: "Einkaufszettel", text: "2 Eier, 3 Äpfel, 5 Liter Milch"}), 
      new ToDo({id: 2, title: "Projekte", text: "Felix misc app, AI Techlabs, Dota 2 Analytics"})
    ]
  }


}
