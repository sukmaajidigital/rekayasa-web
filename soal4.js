// server.js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let id = 1;

// Add new todo
app.post("/api/todos", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }
  const todo = { id: id++, task };
  todos.push(todo);
  res.status(201).json(todo);
});

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Delete todo by ID
app.delete("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
