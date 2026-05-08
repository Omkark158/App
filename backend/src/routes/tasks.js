const router = require('express').Router();
const Task = require('../models/Task');
const { protect } = require('../middleware');
const { pushJob } = require('../queue');

router.use(protect);

// GET /api/tasks — list user's tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks — create task
router.post('/', async (req, res) => {
  try {
    const { title, inputText, operation } = req.body;
    const task = await Task.create({ user: req.user.id, title, inputText, operation });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks/:id/run — push to queue
router.post('/:id/run', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.status = 'pending';
    await task.save();
    await pushJob({ taskId: task._id.toString() });
    res.json({ message: 'Task queued', taskId: task._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/tasks/:id — get single task (status + logs)
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;