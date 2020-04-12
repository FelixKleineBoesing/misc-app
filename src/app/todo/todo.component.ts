import { Component, OnInit } from '@angular/core';
import { ToDo, Priority } from './todo';
import { TodoService } from './todo.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: ToDo[];
  activeTodo: number;
  Math: any;
  priorities: string[];
  
  constructor(private todoApi: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
    this.getAllPriorities()
    this.Math = Math;
  }
  
  getTodos() {
    /* this.todoApi.GetTodos().subscribe(data => {
      this.todos = data;
    }); */
    // mocked TODOs for now
    this.todos = [
      new ToDo({id: 1, title: 'Einkaufszettel', fullText: '2 Eier, 3 Äpfel, 5 Liter Milch'}), 
      new ToDo({id: 2, title: 'Projekte', fullText: 'Felix misc app, AI Techlabs, Dota 2 Analytics'})
    ]
    this.activeTodo = 1;
  }

  updateOpenNote(id: number) {
    this.todos.forEach((value, index) => {
      if (id === value.id) {
        this.activeTodo = index;
      }
    });
  }

  getAllPriorities() {
    this.priorities = []
    for (const value in Priority) {
      if (! isNaN(Number(value))) {
        this.priorities.push(Priority[value]);
      }
    }
  }
}
