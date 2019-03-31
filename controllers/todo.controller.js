const Todo = require('../models/todo.model');


exports.todo_getAll = function (req, res, next) {
    Todo.find({}, function (err, list) {
        if (err) {
            console.log(err.message);
            return next(err);
        }
        res.send(list);
    })
}

exports.todo_create = function (req, res, next) {
    let todo = new Todo(
        {
            content: req.body.content,
            finished: req.body.finished,
            order: req.body.order
        }
    );

    todo.save(function (err) {
        if (err) {
            console.log(err.message);
            return next(err);
        }
        res.send(todo);
    })
}

exports.todo_details = function (req, res, next) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) {
            console.log(err.message);
            return next(err);
        }
        res.send(todo);
    });
}

exports.todo_update = function (req, res, next) {
    Todo.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, todo, result) {
        if (err) {
            console.log(err.message);
            return next(err);
        }
        res.send('todo updated');
    });
}

exports.todo_delete = function (req, res, next) {
    Todo.findOneAndDelete({ _id: req.params.id }, function (err, result) {
        if (err) {
            console.log(err.message);
            return next(err);
        }
        res.send('todo deleted');
    })
}

exports.todo_deleteAll = function (req, res, next) {
    Todo.deleteMany({}, function (err, result) {
        if (err) {
            console.log(err.message);
            return next(err);
        }
        res.send(result);
    })
}
