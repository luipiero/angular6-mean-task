const mongojs = require('mongojs');
const db = mongojs('mean-tasks', ['tasks']);
db.on('connect', () =>
    console.log('database connected')
);
let task={};
task.getTasks = async (req, res, next) => {
    await db.tasks.find((err, tasks) => {
        if (err) return next(err);
        res.json(tasks);
    });
};

task.getTask = async (req, res, next) => {
    await db.tasks.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, (err, task) => {
        if (err) return next(err);
        res.json(task);
    });
};

task.createTask = async (req, res, next) => {
    const task = req.body;
    if (!task.title || !(task.isDone + '')) {
        res.status(400).json({
            'error': 'Bad Data'
        });
    } else {
        await db.tasks.save(task, (err, task) => {
            if (err) return next(err);
            console.log(task);
            res.json(task);
        });
    }
};
task.editTask = async (req, res, next) => {
    const task = req.body;
    let updateTask = {};

    if (task.isDone) {
        updateTask.isDone = task.isDone;
    }
    if (task.title) {
        updateTask.title = task.title;
    }
    if (!updateTask) {
        res.status(400);
        res.json({
            'error': 'bad request'
        });
    } else {
        await db.tasks.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updateTask, {}, (err, task) => {
            if (err) return next(err);
            res.json(task);
        });
    }   
};

task.deleteTask = async (req, res, next) => {
    await db.tasks.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, (err, task) => {
        if (err) {
            res.send(err);
        }
        console.log(task);
        console.log(err);

        res.json(task);
    });  
};

module.exports = task;