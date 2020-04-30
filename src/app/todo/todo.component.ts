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
  todoBackUp: ToDo[] = [];
  activeTodo: number;
  Math: any;
  priorityKeys: string[];
  noteForm: FormGroup;
  cardStringLength = 50;
  filterString = '';
  categories: object;
  priority = Priority;
  order = 'asc';
  chosenCategory: string;

  constructor(public fb: FormBuilder,
              private todoApi: TodoService) {
                this.priorityKeys = Object.keys(Priority).filter(k => !isNaN(Number(k)));
                this.categories = {
                  title: 'Title',
                  fullText: 'Full Text',
                  priority: 'Priority',
                  dueTo: 'due To',
                  resolved: 'Resolved',
                  createdAt: 'Created At',
                  updatedAt: 'Updated At'
                };
                this.chosenCategory = Object.keys(this.categories)[0];
              }

  ngOnInit(): void {
    this.getTodos();
    this.Math = Math;
  }

  checkIffilterStringInToDo(todo: ToDo) {
    if (this.filterString === '') {
      return true;
    }
    let inString = false;
    if (todo.fullText != null) {
      inString = inString || todo.fullText.includes(this.filterString);
    }
    if (todo.title != null) {
      inString = inString || todo.title.includes(this.filterString);
    }
    return inString;
  }

  getObjectKeys(obj: object) {
    return Object.keys(obj);
  }

  sortTodos(): void {
    const coeff = this.order === 'asc' ? 1 : -1;
    const attr = this.chosenCategory;
    function sortFunction(a, b) {
      if (a[attr] < b[attr]) {
        return -1 * coeff;
      }
      if (a[attr] > b[attr]) {
        return 1 * coeff;
      }
      return 0;
    }
    this.todos.sort(sortFunction);
  }

  alterOrder(): void {
    if (this.order === 'asc') {
      this.order = 'desc';
    } else {
      this.order = 'asc';
    }
    this.sortTodos();
  }

  onChanges(): void {
    this.noteForm.valueChanges.subscribe(todo => {
      this.editTodo(todo);
    });
  }

  createFormGroup(todo: ToDo): void {
    this.noteForm = this.fb.group(todo, {updateOn: 'change'});
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
      console.log(this.todos.length)
      if (this.todos.length > 0) {
        this.createFormGroup(this.todos[0]);
      }
    }).catch(data => {
      console.log(data);
    });
  }

  addToDo() {
    this.todoApi.addTodo().toPromise()
    .then(todo => {
      this.todos.unshift(todo);
      this.createFormGroup(todo);
    }).catch(val => {
      console.log(val);
    })
  }

  editTodo(todoChange: ToDo) {
    if (todoChange._id != null) {
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
      });
    }
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
    if (text != null){
      return text.substring(0, Math.min(text.length, this.cardStringLength));
    }
  }
}
