const express = require('express');
const morgan = require('morgan');
const redis = require('redis');
const { DB } = require('./db');
const {
  getTodo,
  deleteTasks,
  updateHeader,
  updateTask,
  createTask,
  deleteTask,
} = require('./handlers');

const REDIS_URL = process.env.REDIS_URL || '6379';
console.log(process.env.REDIS_URL);

const redisClient = redis.createClient(REDIS_URL);
const db = new DB(redisClient);

db.loadTodo().then((todo) => {
  const defaultTodo = { header: 'Todo List', todoList: [] };
  app.locals.Todo = todo || defaultTodo;
});

const app = express();
app.locals.db = db;
app.use(morgan('dev'));
app.use(express.json());
app.use('/todo', express.static('build'));
app.use(express.static('build'));

app.get('/api/getTodo', getTodo);

app.post('/api/deleteTasks', deleteTasks);
app.post('/api/updateHeader', updateHeader);
app.post('/api/updateTask', updateTask);
app.post('/api/createTask', createTask);
app.post('/api/deleteTask', deleteTask);

module.exports = { app };
