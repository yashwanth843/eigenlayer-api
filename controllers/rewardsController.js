const db = require('../db');

exports.getRewardsByAddress = (req, res) => {
  const { address } = req.params;
  db.get(`SELECT * FROM rewards WHERE walletAddress = ?`, [address], (err, reward) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!reward) return res.status(404).json({ message: 'No reward data found' });

    db.all(`SELECT operatorAddress, amountStETH, timestamp FROM reward_breakdown WHERE rewardId = ?`, [reward.id], (err2, breakdown) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const rewardsGrouped = breakdown.reduce((acc, curr) => {
        let entry = acc.find(e => e.operatorAddress === curr.operatorAddress);
        if (!entry) {
          entry = {
            operatorAddress: curr.operatorAddress,
            amountStETH: 0,
            timestamps: []
          };
          acc.push(entry);
        }
        entry.amountStETH += curr.amountStETH;
        entry.timestamps.push(curr.timestamp);
        return acc;
      }, []);

      res.json({
        walletAddress: reward.walletAddress,
        totalRewardsReceivedStETH: reward.totalRewardsReceivedStETH,
        rewardsBreakdown: rewardsGrouped
      });
    });
  });
};
