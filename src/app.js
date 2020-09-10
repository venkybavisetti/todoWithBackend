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
  loadData,
} = require('./handlers');

const url = process.env.REDIS_URL || '6379';

const redisClient = redis.createClient(url);
const db = new DB(redisClient);

const app = express();
app.locals.db = db;
app.use(morgan('dev'));
app.use(express.json());
app.use('/todo', express.static('build'));
app.use(express.static('build'));
app.use(loadData);

app.get('/api/getTodo', getTodo);

app.post('/api/deleteTasks', deleteTasks);
app.post('/api/updateHeader', updateHeader);
app.post('/api/updateTask', updateTask);
app.post('/api/createTask', createTask);
app.post('/api/deleteTask', deleteTask);

module.exports = { app };
