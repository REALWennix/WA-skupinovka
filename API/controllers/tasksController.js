const tasksService = require("../services/tasksService");

async function addTask(req, res) {
  const { description, assignedTo } = req.body;

  if (!description || !assignedTo) {
    return res.status(400).json({ error: "Description and assigned user ID are required" });
  }

  tasksService.addTask(description, assignedTo, (err, result) => {
    if (err) return res.status(500).json({ error: "Error adding task" });
    res.status(201).json({ message: "Task added successfully", id: result.id });
  });
}

async function getTasks(req, res) {
  tasksService.getTasks((err, rows) => {
    if (err) return res.status(500).json({ error: "Error fetching tasks" });
    res.json(rows);
  });
}

module.exports = {
  addTask,
  getTasks
};
