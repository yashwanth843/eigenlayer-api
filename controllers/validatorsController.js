const db = require('../db');

exports.getValidators = (req, res) => {
  db.all(`SELECT * FROM validators`, [], (err, validators) => {
    if (err) return res.status(500).json({ error: err.message });

    const results = [];
    let count = 0;

    validators.forEach((validator) => {
      db.all(`SELECT timestamp, amount, reason FROM slash_history WHERE validatorId = ?`, [validator.id], (err2, history) => {
        if (err2) return res.status(500).json({ error: err2.message });

        results.push({
          operatorAddress: validator.operatorAddress,
          totalDelegatedStakeStETH: validator.totalDelegatedStakeStETH,
          slashHistory: history,
          status: validator.status
        });

        count++;
        if (count === validators.length) res.json(results);
      });
    });
  });
};
