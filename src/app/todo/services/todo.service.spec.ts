/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';

describe('Service: Todo', () => {
  beforeEach(() => {
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
      ]
    });
  });

  it('should ...', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));
});
