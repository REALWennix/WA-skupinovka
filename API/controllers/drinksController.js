const drinksService = require("../services/drinksService");

async function addDrink(req, res) {
  const { name, stock, threshold } = req.body;

  if (!name || stock == null || threshold == null) {
    return res.status(400).json({ error: "Name, stock, and threshold are required" });
  }

  drinksService.addDrink(name, stock, threshold, (err, result) => {
    if (err) return res.status(500).json({ error: "Error adding drink" });
    res.status(201).json({ message: "Drink added successfully", id: result.id });
  });
}

async function getDrinks(req, res) {
  drinksService.getDrinks((err, rows) => {
    if (err) return res.status(500).json({ error: "Error fetching drinks" });
    res.json(rows);
  });
}

async function updateDrink(req, res) {
  const { id, stock } = req.body;

  if (!id || stock == null) {
    return res.status(400).json({ error: "ID and stock are required" });
  }

  drinksService.updateDrink(id, stock, (err, result) => {
    if (err) return res.status(500).json({ error: "Error updating drink stock" });
    res.json({ message: "Drink stock updated successfully", id: result.id });
  });
}

module.exports = {
  addDrink,
  getDrinks,
  updateDrink
};
