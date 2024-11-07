const express = require('express');
const router = express.Router();
const drinkLogsController = require('../controllers/drinkLogsController');

router.post('/add', drinkLogsController.addDrinkLog);
router.post('/add-multiple', drinkLogsController.addMultipleDrinkLogs);
router.get('/all', drinkLogsController.getAllDrinkLogs);
router.get('/range', drinkLogsController.getDrinkLogsByTimeRange);

module.exports = router;
