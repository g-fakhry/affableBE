const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../index');
let mongoose = require("mongoose");
let Todo = require('../models/todo.model');


chai.use(chaiHttp);

let testTodo = {
    'content': 'this is a test todo',
    'order': 41,
    'finished': false
}

let testTodoModified = {
    'content': 'this another is a test todo',
    'order': 44,
    'finished': true
}

describe("Test Todos", () => {

    beforeEach((done) => {
        Todo.remove({}, (err) => {
            done();
        });
    });

    it("should get all todos", (done) => {
        chai.request(app)
            .get('/todos')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.length).to.be.eql(0);
                done();
            })
    });

    it("should post one todo", (done) => {
        chai.request(app)
            .post('/todos/')
            .send(testTodo)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("content", testTodo.content);
                done();
            });
    });

    it("should get one todo by id", (done) => {
        let todo = new Todo(testTodo);
        todo.save((err, todo) => {
            chai.request(app)
                .get('/todos/' + todo.id)
                .send(todo)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("_id", todo.id);
                    done();
                });
        });
    });

    it("should delete a todo by id", (done) => {
        let todo = new Todo(testTodo);
        todo.save((err, todo) => {
            chai.request(app)
                .delete('/todos/' + todo.id)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.have.property("text", "todo deleted");
                    done();
                });
        });
    });

    it("should delete all todos", (done) => {
        let todo = new Todo(testTodo);
        todo.save((err, todo) => {
            chai.request(app)
                .delete('/todos')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("deletedCount", 1);
                    done();
                });
        });
    });
})

