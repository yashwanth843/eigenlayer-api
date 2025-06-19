const db = require('../db');

function seedData() {
        db.serialize(() => {
                
                db.run("DELETE FROM restakers");
                db.run("DELETE FROM validators");
                db.run("DELETE FROM slash_history");
                db.run("DELETE FROM rewards");
                db.run("DELETE FROM reward_breakdown");

                
                db.run(`INSERT INTO restakers (userAddress, amountRestakedStETH, targetAVSOperatorAddress)
            VALUES ('0x123...', 100.5, '0xabc...'),
                   ('0x456...', 200.0, '0xdef...'),
                   ('0x789...', 150.75, '0xghi...')`);

                
                const validatorData = [
                        {
                                address: '0xabc...', stake: 5000, status: 'active', slashes: [
                                        { timestamp: 1678886400, amount: 50, reason: 'Misconduct X' }
                                ]
                        },
                        {
                                address: '0xdef...', stake: 8000, status: 'slashed', slashes: [
                                        { timestamp: 1679000000, amount: 100, reason: 'Downtime' },
                                        { timestamp: 1679100000, amount: 25, reason: 'Invalid Signature' }
                                ]
                        },
                        { address: '0xghi...', stake: 3000, status: 'active', slashes: [] }
                ];

                validatorData.forEach(v => {
                        db.run(`INSERT INTO validators (operatorAddress, totalDelegatedStakeStETH, status)
              VALUES (?, ?, ?)`, [v.address, v.stake, v.status], function () {
                                const validatorId = this.lastID;
                                v.slashes.forEach(s => {
                                        db.run(`INSERT INTO slash_history (validatorId, timestamp, amount, reason)
                  VALUES (?, ?, ?, ?)`, [validatorId, s.timestamp, s.amount, s.reason]);
                                });
                        });
                });

                
                const rewardData = [
                        {
                                wallet: '0x123...',
                                total: 75.2,
                                breakdown: [
                                        { operator: '0xabc...', amount: 60.0, timestamps: [1678972800, 1679059200] },
                                        { operator: '0xdef...', amount: 15.2, timestamps: [1679145600] }
                                ]
                        },
                        {
                                wallet: '0x456...',
                                total: 120.0,
                                breakdown: [
                                        { operator: '0xghi...', amount: 100.0, timestamps: [1679200000] },
                                        { operator: '0xabc...', amount: 20.0, timestamps: [1679300000, 1679350000] }
                                ]
                        }
                ];

                rewardData.forEach(r => {
                        db.run(`INSERT INTO rewards (walletAddress, totalRewardsReceivedStETH)
              VALUES (?, ?)`, [r.wallet, r.total], function () {
                                const rewardId = this.lastID;
                                r.breakdown.forEach(b => {
                                        b.timestamps.forEach(t => {
                                                db.run(`INSERT INTO reward_breakdown (rewardId, operatorAddress, amountStETH, timestamp)
                    VALUES (?, ?, ?, ?)`, [rewardId, b.operator, b.amount / b.timestamps.length, t]);
                                        });
                                });
                        });
                });
        });
}

seedData();
