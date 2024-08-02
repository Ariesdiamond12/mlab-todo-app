const express = require("express");
const cors = require("cors");
const db = require("better-sqlite3")("database.db");
const app = express();
const port = 3001;
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

// Create the table
const createTable = () => {
  const sql_user = `
        CREATE TABLE IF NOT EXISTS user 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
        `;
  db.prepare(sql_user).run();
};
createTable();

// Insert a new user
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  const sql = `
            INSERT INTO user (name, email, password)
            VALUES (?, ?, ?)
            `;
  const info = db.prepare(sql).run(name, email, password);
  res.status(201).json({ id: info.lastInsertRowid });
});

// Get all users
app.get("/users", (req, res) => {
  const sql = `
SELECT * FROM user
`;
  const rows = db.prepare(sql).all();
  res.json(rows);
});
// Get a user by id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
SELECT * FROM user
WHERE id = ?
`;
  const row = db.prepare(sql).get(id);
  if (row) {
    res.json(row);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Update a user by id
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const sql = `
UPDATE user
SET name = ?, age = ?
WHERE id = ?
`;
  const info = db.prepare(sql).run(name, age, id);
  if (info.changes > 0) {
    res.json({ message: "User updated successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Delete a user by id
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
DELETE FROM user
WHERE id = ?
`;
  const info = db.prepare(sql).run(id);
  if (info.changes > 0) {
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

/*********____ToDos____************************************** */

const createTodoTable = () => {
  const sql_todo = `CREATE TABLE IF NOT EXISTS todo 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            priority TEXT NOT NULL,
            isComplete BOOLEAN DEFAULT 0
        )
        `;
  db.prepare(sql_todo).run();
};
createTodoTable();

// Insert a new user
app.post("/todo", (req, res) => {
  const { text, priority } = req.body;
  const sql = `
            INSERT INTO todo (text, priority)
            VALUES (?, ?)
            `;
  const info = db.prepare(sql).run(text, priority);
  res.status(201).json({ id: info.lastInsertRowid });
});

// Get all users
app.get("/todo", (req, res) => {
  const sql = `
SELECT * FROM todo
`;
  const rows = db.prepare(sql).all();
  res.json(rows);
});

// Get a user by id
app.get("/todo/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
SELECT * FROM todo
WHERE id = ?
`;
  const row = db.prepare(sql).get(id);
  if (row) {
    res.json(row);
  } else {
    res.status(404).json({ error: "todos not found" });
  }
});

// Delete a todo by id
app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    DELETE FROM todo
    WHERE id = ?
  `;
  const info = db.prepare(sql).run(id);
  if (info.changes) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Update a user by id
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const sql = `
UPDATE user
SET name = ?, age = ?
WHERE id = ?
`;
  const info = db.prepare(sql).run(name, age, id);
  if (info.changes > 0) {
    res.json({ message: "User updated successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
