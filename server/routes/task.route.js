const router = require('express-promise-router')();
const task = require('./task.db');

router.get('/tasks', task.getTasks);
router.get('/tasks/:id', task.getTask);
router.post('/tasks', task.createTask);
router.put('/tasks/:id', task.editTask);
router.delete('/tasks/:id', task.deleteTask);

module.exports = router;