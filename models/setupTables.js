const db = require('../db');

module.exports = function setupTables() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS restakers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userAddress TEXT,
      amountRestakedStETH REAL,
      targetAVSOperatorAddress TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS validators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      operatorAddress TEXT,
      totalDelegatedStakeStETH REAL,
      status TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS slash_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      validatorId INTEGER,
      timestamp INTEGER,
      amount REAL,
      reason TEXT,
      FOREIGN KEY (validatorId) REFERENCES validators(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      walletAddress TEXT,
      totalRewardsReceivedStETH REAL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS reward_breakdown (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rewardId INTEGER,
      operatorAddress TEXT,
      amountStETH REAL,
      timestamp INTEGER,
      FOREIGN KEY (rewardId) REFERENCES rewards(id)
    )`);
  });
};