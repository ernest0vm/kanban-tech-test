var express = require('express');
var router = express.Router();
var tasksController = require('../controllers/tasks.controller');
var middleware = require('../middleware');

router.get('/tasks/:id', tasksController.getById);

router.use(middleware);

router
    .post('/tasks', tasksController.create)
    .get('/tasks', tasksController.getAll);

module.exports = router;
