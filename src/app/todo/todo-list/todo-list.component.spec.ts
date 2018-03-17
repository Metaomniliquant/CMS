/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockBackend } from '@angular/http/testing';

import { TodoListComponent } from './todo-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TodoStateMenuComponent } from '../todo-state-menu/todo-state-menu.component';
import { TodoComponent } from '../todo/todo.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { TodoService } from '../services/todo.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { RouterTestingModule } from "@angular/router/testing";

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        MockBackend,
        BaseRequestOptions,
        {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: (backend: MockBackend, options: BaseRequestOptions) => { return new Http(backend, options); }
        }
      ],
      declarations: [ TodoListComponent, TodoStateMenuComponent, TodoComponent, TodoDetailComponent ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
