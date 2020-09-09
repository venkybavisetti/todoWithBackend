const { getNextStatus, getDefaultStatus } = require('./statuses');

const generateId = function () {
  return Math.floor(Math.random() * Date.now());
};

const getTodo = (req, res) => {
  res.json(req.app.locals.Todo);
};

const deleteTasks = (req, res) => {
  const { Todo } = req.app.locals;
  Todo.todoList = [];
  res.end();
};

const updateHeader = (req, res) => {
  const { Todo } = req.app.locals;
  const { header } = req.body;
  Todo.header = header;
  res.end();
};

const updateTask = (req, res) => {
  const { Todo } = req.app.locals;
  const { taskId } = req.body;
  const task = Todo.todoList.find((task) => task.id === taskId);
  task.status = getNextStatus(task.status);
  res.end();
};

const createTask = (req, res) => {
  const { Todo } = req.app.locals;
  const { text } = req.body;
  Todo.todoList.push({ text, id: generateId(), status: getDefaultStatus() });
  res.end();
};

const deleteTask = (req, res) => {
  const { Todo } = req.app.locals;
  const { taskId } = req.body;
  Todo.todoList = Todo.todoList.filter((task) => task.id !== taskId);
  res.end();
};

module.exports = {
  getTodo,
  deleteTasks,
  updateHeader,
  updateTask,
  createTask,
  deleteTask,
};
