const express = require('express');
const router = express.Router();
const drinksController = require('../controllers/drinksController');

router.post('/add', drinksController.addDrink);
router.get('/', drinksController.getDrinks);
router.put('/update', drinksController.updateDrink);

module.exports = router;
