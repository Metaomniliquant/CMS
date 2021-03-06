import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Todo } from '../services/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit {

  constructor() { }

  @Input()
  todo: Todo;
  @Input()
  selected: boolean;
  @Input()
  editMode: Boolean;

  @Output()
  onSelect = new EventEmitter<Todo>();
  @Output()
  onCancel = new EventEmitter<Todo>();
  @Output()
  onDelete = new EventEmitter<Todo>();
  @Output()
  onSave = new EventEmitter<Todo>();

  previousTodo: Todo;

  ngOnInit() {
  }

  select($event) {
    this.onSelect.emit(this.todo);
    this.selected = !this.selected;
  }

  edit() {
    this.previousTodo = Object.assign({}, this.todo);
    this.editMode = true;
  }

  cancel() {
    this.todo.text = this.previousTodo.text;
    this.todo.description = this.previousTodo.description;
    this.todo.done = this.previousTodo.done;
    this.editMode = false;

    this.onCancel.emit(this.todo);
  }

  save() {
    this.onSave.emit(this.todo);
    this.editMode = false;
  }

  delete() {
    this.onDelete.emit(this.todo);
  }

}
