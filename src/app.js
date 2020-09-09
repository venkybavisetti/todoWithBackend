const express = require('express');
const morgan = require('morgan');
const redis = require('redis');
const REDIS_URL = process.env.REDIS_URL || '6379';

const db = redis.createClient(REDIS_URL);

const {
  getTodo,
  deleteTasks,
  updateHeader,
  updateTask,
  createTask,
  deleteTask,
} = require('./handlers');

const app = express();
app.locals.db = db;
app.locals.Todo = { header: 'Todo List', todoList: [] };
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
