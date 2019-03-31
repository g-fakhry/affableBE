const express = require('express');
const router = express.Router();

const todo_controller = require('../controllers/todo.controller');

router.get('/', todo_controller.todo_getAll);
router.get('/:id', todo_controller.todo_details);
router.post('/', todo_controller.todo_create);
router.put('/:id', todo_controller.todo_update);
router.delete('/:id', todo_controller.todo_delete);
router.delete('/', todo_controller.todo_deleteAll);

module.exports = router;