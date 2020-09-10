class DB {
  constructor(client) {
    this.client = client;
  }

  loadTodo() {
    return new Promise((resolve, reject) => {
      this.client.get('todo', (err, res) => resolve(JSON.parse(res)));
    });
  }

  saveTodo(todo) {
    return new Promise((resolve, reject) => {
      this.client.set('todo', JSON.stringify(todo), (err, res) =>
        resolve(true)
      );
    });
  }
}

module.exports = { DB };
