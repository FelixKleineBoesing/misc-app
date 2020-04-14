import { Component, OnInit } from '@angular/core';
import { ToDo, Priority } from './todo';
import { TodoService } from './todo.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { FormBuilder, FormGroup } from '@angular/forms';


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
  noteForm: FormGroup;

  constructor(public fb: FormBuilder,
              private todoApi: TodoService) {
                this.createFormGroup();
              }

  ngOnInit(): void {
    this.getTodos();
    this.getAllPriorities();
    this.Math = Math;
  }

  onChanges(): void {
    console.log("onChanges")
    this.noteForm.valueChanges.subscribe(todo => {
      console.log(todo.ToDo);
      this.todoApi.editTodo(todo.ToDo);
      console.log("edited");
      this.editTodo(todo.ToDo);
      console.log("edited in comp");
    })
  }

  createFormGroup(todo: ToDo = new ToDo()): void {
    this.noteForm = this.fb.group({
      ToDo: this.fb.group(todo), options: {updateOn: 'change'}
    })
    this.onChanges();
  }

  resetForm() {
    this.noteForm.reset();
  }

  deleteToDo(id: number) {
    let i: number = null;
    this.todos.forEach((value, index) => {
      if (id === value.id) {
        i = index;
      }
    });
    this.todos.splice(i, 1);
    this.resetForm();
  }

  getTodos() {
    this.todoApi.getTodos().toPromise().then(data => {
      console.log(data);
      this.todos = data;
      this.activeTodo = this.todos.length === 0 ? null : this.todos[0].id;
      this.createFormGroup(this.todos[0]);
    }).catch(data => {
      console.log(data);
    });
  }

  addToDo() {
    this.todoApi.addTodo().toPromise()
    .then(todo => {
      console.log(todo);
      console.log(this.todos);
      this.todos.unshift(todo);
      console.log(this.todos);
    });
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
        i++;
      } 
    }
  }

  updateOpenNote(id: number) {
    this.todos.forEach((value, index) => {
      if (id === value.id) {
        this.activeTodo = index;
      }
    });
    this.createFormGroup(this.todos[this.activeTodo]);
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
