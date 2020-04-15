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

  todos: ToDo[] = [];
  activeTodo: number;
  Math: any;
  priorityKeys: string[];
  noteForm: FormGroup;
  priority = Priority;
  cardStringLength = 50;

  constructor(public fb: FormBuilder,
              private todoApi: TodoService) {
                this.priorityKeys = Object.keys(this.priority).filter(k => !isNaN(Number(k)));
              }

  ngOnInit(): void {
    this.getTodos();
    this.Math = Math;
  }

  onChanges(): void {
    this.noteForm.valueChanges.subscribe(todo => {
      this.editTodo(todo.ToDo);
    });
  }

  createFormGroup(todo: ToDo): void {
    this.noteForm = this.fb.group({
      ToDo: this.fb.group(todo), options: {updateOn: 'change'}
    });
    this.onChanges();
  }

  resetForm() {
    this.noteForm.reset();
  }

  deleteToDo(id: string) {
    let i: number = 0;
    this.todoApi.deleteTodo(id).toPromise().then(val => {
      this.todos.forEach((value, index) => {
        if (id === value._id) {
          i = index;
        }
      });
      this.todos.splice(i, 1);
      this.resetForm();
    });
  }

  getTodos() {
    this.todoApi.getTodos().toPromise().then(data => {
      this.todos = data;
      this.activeTodo = this.todos.length === 0 ? null : 0;
      if (this.todos.length > 0) {
        this.createFormGroup(this.todos[0]);
      }
    }).catch(data => {
      console.log(data);
    });
  }

  addToDo() {
    console.log('adding');
    this.todoApi.addTodo().toPromise()
    .then(todo => {
      console.log(todo);
      this.todos.unshift(todo);
      this.createFormGroup(todo);
    }).catch(val => {
      console.log(val);
    })
  }

  editTodo(todoChange: ToDo) {
    if (this.todos.length > 0) {
      let found: boolean = false;
      let i: number = 0;
      while (! found) {
        if (todoChange._id === this.todos[i]._id) {
          found = true;
          this.todos[i] = todoChange;
        }
        found = i === this.todos.length - 1 ? true : false;
        i++;
      }
    }
    this.todoApi.editTodo(todoChange).toPromise().then(val => {
    }).catch(val => {
      console.log(val);
    })
  }

  updateOpenNote(id: string) {
    this.todos.forEach((value, index) => {
      if (id === value._id) {
        this.activeTodo = index;
      }
    });
    this.createFormGroup(this.todos[this.activeTodo]);
  }

  getSubStringForCard(text: string) {
    return text.substring(0, Math.min(text.length, this.cardStringLength)).replace(/<[^>]*>/g, '');
  }
}
