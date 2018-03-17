import { Router } from 'express';
import { TodoRouter } from './todoRouter';

export class ApiRouter {
    constructor(
        private router: Router = Router(),
        private todoRouter: TodoRouter = new TodoRouter()) { }

    public createRouteHandler(): Router {
        const handler = this.todoRouter.createRouteHandler();

        this.router.use('/api', handler);

        return this.router;
    }
}
