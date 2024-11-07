const drinkLogsService = require("../services/drinkLogsService");

async function addDrinkLog(req, res) {
  const { userId, drinkId } = req.body;

  if (!userId || !drinkId) {
    return res.status(400).json({ error: "User ID and Drink ID are required" });
  }

  drinkLogsService.addDrinkLog(userId, drinkId, (err, result) => {
    if (err) return res.status(500).json({ error: "Error logging drink" });
    res.status(201).json({ message: "Drink log added successfully", id: result.id });
  });
}

async function getAllDrinkLogs(req, res) {
  drinkLogsService.getAllDrinkLogs((err, rows) => {
    if (err) return res.status(500).json({ error: "Error fetching drink logs" });
    res.json(rows);
  });
}

async function getDrinkLogsByTimeRange(req, res) {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Start date and end date are required" });
  }

  drinkLogsService.getDrinkLogsByTimeRange(startDate, endDate, (err, rows) => {
    if (err) return res.status(500).json({ error: "Error fetching drink logs for specified time range" });
    res.json(rows);
  });
}

async function addMultipleDrinkLogs(req, res) {
    const { userId, drinkIds } = req.body;
  
    if (!userId || !Array.isArray(drinkIds) || drinkIds.length === 0) {
      return res.status(400).json({ error: "User ID and an array of drink IDs are required" });
    }
  
    drinkLogsService.addMultipleDrinkLogs(userId, drinkIds, (err, results) => {
      if (err) return res.status(500).json({ error: "Error logging drinks" });
      res.status(201).json({ message: "Drinks logged successfully", loggedDrinks: results });
    });
  }

module.exports = {
  addDrinkLog,
  addMultipleDrinkLogs,
  getAllDrinkLogs,
  getDrinkLogsByTimeRange
};
