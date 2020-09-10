const { getNextStatus, getDefaultStatus } = require('./statuses');

const generateId = function () {
  return Math.floor(Math.random() * Date.now());
};

const loadData = (req, res, next) => {
  req.app.locals.db.loadTodo().then((todo) => {
    const defaultTodo = { header: 'Todo List', todoList: [] };
    req.app.locals.Todo = todo || defaultTodo;
    next();
  });
};

const getTodo = (req, res) => {
  res.json(req.app.locals.Todo);
};

const deleteTasks = (req, res) => {
  const { Todo, db } = req.app.locals;
  Todo.todoList = [];
  Todo.header = 'Todo List';
  db.saveTodo(Todo).then((status) => status && res.json(Todo));
};

const updateHeader = (req, res) => {
  const { Todo, db } = req.app.locals;
  const { header } = req.body;
  Todo.header = header;

  db.saveTodo(Todo).then((status) => status && res.json(Todo));
};

const updateTask = (req, res) => {
  const { Todo, db } = req.app.locals;
  const { taskId } = req.body;
  const task = Todo.todoList.find((task) => task.id === taskId);
  task.status = getNextStatus(task.status);

  db.saveTodo(Todo).then((status) => status && res.json(Todo));
};

const createTask = (req, res) => {
  const { Todo, db } = req.app.locals;
  const { text } = req.body;
  Todo.todoList.push({ text, id: generateId(), status: getDefaultStatus() });
  db.saveTodo(Todo).then((status) => status && res.json(Todo));
};

const deleteTask = (req, res) => {
  const { Todo, db } = req.app.locals;
  const { taskId } = req.body;
  Todo.todoList = Todo.todoList.filter((task) => task.id !== taskId);
  db.saveTodo(Todo).then((status) => status && res.json(Todo));
};

module.exports = {
  getTodo,
  deleteTasks,
  updateHeader,
  updateTask,
  createTask,
  deleteTask,
  loadData,
};
