import express from 'express';
import { ToDo } from '../model/ToDo';
import { auth } from '../middleware/auth';

export const todoRouter = express.Router();

todoRouter.route('/todo').post(auth);
todoRouter.route('/todo/get-all').get(auth);
todoRouter.route('/todo/:id').get(auth);
todoRouter.route('/todo/:id').delete(auth);
todoRouter.route('/todo/:id').put(auth);

todoRouter.route('/todo').post((req: any, res: any, next: any) => {
    const todo = req.body;
    todo.userID = req.user._id;
    ToDo.create(todo, (error: any, data: any) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

todoRouter.route('/todo/get-all').get((req: any, res: any, next: any) => {
    ToDo.find({ userID: req.user._id }, (error: any, data: any) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

todoRouter.route('/todo/:id').get((req: any, res: any, next: any) => {
    ToDo.findById(req.params.id, (error: any, data: any) => {
        if (!data.isUserAllowedToView(req.user._id)) {
            throw new Error('You are not allowed to view this Todo!');
        }
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

todoRouter.route('/todo/:id').put((req: any, res: any, next: any) => {
    ToDo.findById(req.params.id, (error: any, data: any) => {
        console.log(data)
        if (!data.isUserAllowedToChange(req.user._id)) {
            throw new Error('You are not allowed to change this ToDo');
        }
        if (error) {
            return next(error);
        } else {
            ToDo.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, (error: any, data: any) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                    console.log('Todo successfully updated');
                }
            });
        }
    });
});

todoRouter.route('/todo/:id').delete((req: any, res: any, next: any) => {
    console.log(req.params.id);
    ToDo.findByIdAndRemove(req.params.id, (error: any, data: any) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ msg: data });
        }
    });
});
