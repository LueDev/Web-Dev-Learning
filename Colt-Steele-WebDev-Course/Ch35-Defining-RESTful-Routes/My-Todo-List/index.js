//I will be creating my own to-do list with express as practice. 

//First we must import/require certain express libraries/dependancies 
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))

// To parse incoming JSON in POST request body:
app.use(express.json());

//Serve the static files within public (css and js src code)
app.use(express.static('public'));

//Given Express can only do GET/POST, we use method override to imitate the other HTTP calls (delete/patch/etc)
const methodOverride = require('method-override');
app.use(methodOverride('_method'))

//importing Task class
const Task = require('./task');

//This will store active task objects
let tasks = [];

//This will store completed task objects 
let completedTasks = [];

//To show the main index page with all the tasks 
app.get('/', (req, res) => {
    res.render('index', {tasks, completedTasks})
  })

// NEW TASK - route handler for creating and storing tasks
app.post('/tasks', (req, res) => {
    
    // assuming the name is provided in the request body/form 
    const taskName = req.body.newTask; 
    
    // create new task object
    const newTask = new Task(taskName);
    newTask.createdTime = newTask.formatCreateDate()
  
    // store the task in the array
    tasks.push(newTask);
  
    // res.status(201).json({ message: 'Task created successfully' });
    console.log(`Tasks: - - - \n`)
    console.log(tasks)
    res.redirect('/');
  });
  
// **********************
// UPDATE (task.name) - Will allow same page changes (similar to react) rather than look at each individual task on a separate page.
//      Despite not using patch (bc we're not using different pages), this post does the trick.
// **********************

app.post('/tasks/:id', (req, res) => {
    const { id } = req.params;
    // const foundTask = tasks.find(task => task.Task.id === id);
    const foundTask = tasks.find(task => task.id === parseInt(id));

    //get new text from req.body
    const newTaskText = req.body.taskUpdate;

    // update the comment with the data from req.body:
    foundTask.name = newTaskText;
    console.log(foundTask)
    
    //redirect back to index (or wherever you want)
    res.redirect('/')
})

app.post('/tasks/completed/:id', (req, res) => {
    const { id } = req.params;
    const foundTask = completedTasks.find(task => task.id === parseInt(id));

    //get new text from req.body
    const newTaskText = req.body.taskUpdate;
    //update the comment with the data from req.body:
    foundTask.name = newTaskText;
    //redirect back to index (or wherever you want)
    res.redirect('/')
})

// **********************
// UPDATE (mark as completed) - Will allow same page changes (similar to react) rather than look at each individual task on a separate page.
//      Despite not using patch (bc we're not using different pages), this post does the trick.
// **********************


app.post('/tasks/:id/completed', (req, res) => {
    const { id } = req.params;
    let foundTask = tasks.find(task => task.id === parseInt(id));

    //update the comment with the data from req.body:
    foundTask.completed = true;
    foundTask.complete();
    foundTask.completedTime = foundTask.formatCompleteDate();

    tasks = tasks.filter(task => task.id !== parseInt(id));
    completedTasks.push(foundTask);
    
    res.redirect('/')
})

app.post('/tasks/:id/incomplete', (req, res) => {
    const { id } = req.params;
    let foundTask = completedTasks.find(task => task.id === parseInt(id));

    //update the comment with the data from req.body:
    foundTask.completed = false;
    foundTask.incomplete();

    completedTasks = completedTasks.filter(task => task.id !== parseInt(id));
    tasks.push(foundTask);
    
    res.redirect('/')
})

// **********************
// DELETE TASK - Will delete a task from tasks and will
// **********************

app.delete('/tasks/:id/delete', (req, res) => {
    const { id } = req.params;
    let foundTask = tasks.filter(task => task.id !== parseInt(id));
    console.log(`Active Task(s): - - - - - \n ${JSON.stringify(foundTask)}`);
    tasks.pop(foundTask);
    res.redirect('/');
});
app.delete('/tasks/completed/:id/delete', (req, res) => {
    const { id } = req.params;
    let foundTask = completedTasks.filter(task => task.id !== parseInt(id));
    completedTasks.pop(foundTask);
    console.log(`Complete Task(s): - - - - - \n ${JSON.stringify(foundTask)}`);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`To-do List app listening on port ${port}`)
})