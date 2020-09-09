const express = require('express');
const morgan = require('morgan');
const redis = require('redis');

const db = redis.createClient({
  db: 1,
  port: process.env.REDIS_URL || 6379,
});

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

app.get('/api/getTodo', getTodo);

app.post('/api/deleteTasks', deleteTasks);
app.post('/api/updateHeader', updateHeader);
app.post('/api/updateTask', updateTask);
app.post('/api/createTask', createTask);
app.post('/api/deleteTask', deleteTask);

module.exports = { app };
