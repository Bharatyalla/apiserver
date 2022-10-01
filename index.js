const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
const router = express.Router();

const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.use((req, res, next) => {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

app.get('/', (req, res) => {
  var info = '\
    <html><body><h1>TODO test server</h1><p>See README.md for instructions.<p></body></html>';
  res.send(info);
});

var count = 1;
var taskList = [
  {
    id: 0,
    description: "My main thing to do",
    complete: false,
    priority:2
  }
];

app.get('/api/tasks', (req, res) => {
  res.json({tasks: taskList});
});

app.post('/api/tasks', (req, res) => {
  var task = req.body;
  console.log(JSON.stringify(task), req.body);
  const newTask = {id: count++, complete:task.complete,description:task.description,priority:task.priority}
  taskList.push(newTask);
  res.sendStatus(201);
});

app.put('/api/tasks/:id', (req, res) => {
  var id = parseInt(req.params.id);
  var task = req.body;

  var index = taskList.findIndex(item => item.id === id);

  if(task.description) {
    taskList[index].description = task.description;
  }
  if(task.priority) {
    taskList[index].priority = task.priority;
  }
  if(task.hasOwnProperty('complete')) {
    taskList[index].complete = task.complete;
  }
setTimeout(()=>{
  res.sendStatus(200);

},1500)
});

app.delete('/api/tasks/:id', (req, res) => {
  var id = parseInt(req.params.id);
  taskList = taskList.filter(item => item.id !== id);
  setTimeout(()=>{
    res.sendStatus(200);
  },2000)
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});