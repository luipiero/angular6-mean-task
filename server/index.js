const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const tasksRoutes = require('./routes/task.route');

app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api', tasksRoutes);

// static files
app.use(express.static(path.join(__dirname,'..','frontend/dist/frontend')));
console.log(path.join(__dirname,'..','frontend/dist/frontend'));
// start the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
}); 
