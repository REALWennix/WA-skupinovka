const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.post('/add', tasksController.addTask);
router.get('/', tasksController.getTasks);

module.exports = router;
