import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'}
  , { path: 'list', component: TodoListComponent }
  , { path: ':id', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TodoRoutingModule { }
