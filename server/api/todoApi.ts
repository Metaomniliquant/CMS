import { Request, Response, NextFunction } from 'express';
import { Todo } from '../data/schema/Todo';

export class TodoApi {
    public index(req: Request, res: Response, next: NextFunction) {
        Todo.find((err, todos) => {
            if(err) {
                return res.send(err);
            }

            res.json(todos);
        });
    }

    public item(req: Request, res: Response, next: NextFunction) {
        Todo.findById(req.params.id, (err, todo) => {
            if(err) {
                return res.send(err);
            }

            res.json(todo);
        });
    }

    public post(req: Request, res: Response, next: NextFunction) {
        Todo.create({
            text: req.body.text,
            description: req.body.description,
            done: !!req.body.done
        }, (err, todo) => {
            if(err) {
                return res.send(err);
            }

            Todo.find((err, todos) => {
                if(err) {
                    return res.send(err);
                }

                res.json(todos);
            });
        });
    }

    public put(req: Request, res: Response, next: NextFunction) {
        Todo.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
            if(err) {
                return res.send(err);
            }

            Todo.find((err, todos) => {
                if(err) {
                    return res.send(err);
                }

                res.json(todos);
            });
        });
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Todo.findByIdAndRemove(req.params.id, (err, todo) => {
            if(err) {
                return res.send(err);
            }

            Todo.find((err, todos) => {
                if(err) {
                    return res.send(err);
                }

                res.json(todos);
            })
        });
    }
}
