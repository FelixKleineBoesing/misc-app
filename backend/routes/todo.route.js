const express = require('express');
const app = express();
const todoRoute = express.Router();


let ToDo = require("../model/ToDo");

todoRoute.route("/add-todo").post((req, res, next) => {
    console.log(req.body);
    ToDo.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })    
})

todoRoute.route("/get-todos").get((req, res) => {
    ToDo.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

todoRoute.route("/get-todo/:id").get((req, res) => {
    ToDo.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

todoRoute.route("/update-todo/:id").put((req, res, next) => {
    ToDo.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log("Todo successfully updated")
        }
    })
})

todoRoute.route("/delete-todo/:id").delete((req, res, next) => {
    console.log(req.params.id);
    ToDo.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(door);
        } else {
            res.status(200).json({msg: data})
        }
    })
})

module.exports = todoRoute;