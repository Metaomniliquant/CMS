import { Router } from 'express';
import { TodoApi } from '../api/todoApi';

export class TodoRouter {
    constructor(
        private router: Router = Router(),
        private api: TodoApi = new TodoApi()) { }

    public createRouteHandler(): Router {
        const handler = this.createSubRouteHandler();

        this.router.use('/todo', handler);

        return this.router;
    }

    public createSubRouteHandler(): Router {
        const router = Router();

        // GET: /*/todo
        router.get('/', this.api.index.bind(this.api.index));

        // GET: /*/todo/1
        router.get('/:id', this.api.item.bind(this.api.item));

        // POST: /*/todo
        router.post('/', this.api.post.bind(this.api.item));

        // PUT: /*/todo/1
        router.put('/:id', this.api.put.bind(this.api.item))

        // DELETE: /*/todo/1
        router.delete('/:id', this.api.delete.bind(this.api.item));

        return router;
    }
}
