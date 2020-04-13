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
    this.createFormGroup(this.todos[0]);
  }

  onChanges(): void {
    this.noteForm.valueChanges.subscribe(val => {
      console.log(val);
    })
  }

  createFormGroup(todo: ToDo = new ToDo()): void {
    this.noteForm = this.fb.group({
      ToDo: this.fb.group(todo), options: {updateOn: 'change'}
    })
    this.onChanges();
  }

  resetForm() {
    this.noteForm.reset({ToDo: new ToDo()});
  }

  deleteToDo(id) {
    console.log("deleteToDo Comp");
    this.todoApi.deleteTodo(id);
    this.getTodos();
    this.createFormGroup();
  }

  getTodos() {
    this.todoApi.getTodos().subscribe(data => {
      this.todos = data;
    });
    if (this.todos.length === 0) {
      this.activeTodo = null;
    } else {
      this.activeTodo = this.todos[0].id;
    }
  }
  
  addToDo() {
    this.todoApi.addTodo().subscribe(data => {
      const id = data["id"];
    })
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
