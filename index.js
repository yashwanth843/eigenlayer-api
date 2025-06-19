const express = require('express');
const app = express();
const restakerRoutes = require('./routes/restakers');
const validatorRoutes = require('./routes/validators');
const rewardRoutes = require('./routes/rewards');
const setupTables = require('./models/setupTables');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/restakers', restakerRoutes);
app.use('/validators', validatorRoutes);
app.use('/rewards', rewardRoutes);

// Initialize DB Tables
setupTables();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));