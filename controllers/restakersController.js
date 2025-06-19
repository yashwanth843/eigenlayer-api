const db = require('../db');

exports.getRestakers = (req, res) => {
  db.all(`SELECT userAddress, amountRestakedStETH, targetAVSOperatorAddress FROM restakers`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};