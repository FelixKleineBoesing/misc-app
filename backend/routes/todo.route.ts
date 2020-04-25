import express from 'express';
import { ToDo } from '../model/ToDo';

export const todoRouter = express.Router();


todoRouter.route('/add-todo').post((req: any, res: any, next: any) => {
    console.log(req.body);
    ToDo.create(req.body, (error: any, data: any) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

todoRouter.route('/get-todos').get((req: any, res: any, next: any) => {
    ToDo.find((error: any, data: any) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

todoRouter.route('/get-todo/:id').get((req: any, res: any, next: any) => {
    ToDo.findById(req.params.id, (error: any, data: any) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

todoRouter.route('/update-todo/:id').put((req: any, res: any, next: any) => {
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
});

todoRouter.route('/delete-todo/:id').delete((req: any, res: any, next: any) => {
    console.log(req.params.id);
    ToDo.findByIdAndRemove(req.params.id, (error: any, data: any) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({msg: data});
        }
    });
});


