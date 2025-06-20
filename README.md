# EigenLayer Restaking Info API (SQLite Version)

This project is a backend service that aggregates and exposes EigenLayer restaking data using Node.js,
Express, and SQLite. It provides endpoints to retrieve user restaking info, validator metadata, and reward insights.

---

## 🚀 Features

- **GET /restakers** — List of users who restaked stETH
- **GET /validators** — Metadata for each validator/operator
- **GET /rewards/:address** — Reward summary for a specific wallet

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (via `sqlite3`)
- **Structure**: Modular folder-based architecture
- **Mock Data**: Seeded using a custom script

---

## 📁 Folder Structure
# EigenLayer Restaking Info API (SQLite Version)

This project is a backend service that aggregates and exposes EigenLayer restaking data using Node.js, Express, and SQLite. 
It provides endpoints to retrieve user restaking info, validator metadata, and reward insights.

---

## 🚀 Features

- **GET /restakers** — List of users who restaked stETH
- **GET /validators** — Metadata for each validator/operator
- **GET /rewards/:address** — Reward summary for a specific wallet

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (via `sqlite3`)
- **Structure**: Modular folder-based architecture
- **Mock Data**: Seeded using a custom script

---

## 📁 Folder Structure

/project-root/
├── server.js 
├── db.js 
├── models/
│ └── setupTables.js
├── controllers/
│ ├── restakersController.js
│ ├── validatorsController.js
│ └── rewardsController.js
├── routes/
│ ├── restakers.js
│ ├── validators.js
│ └── rewards.js
├── scripts/
│ └── fetchData.js 
├── data/
│ └── eigenlayer.db
├── package.json

github-link:https://github.com/yashwanth843/eigenlayer-api
depolyed Link: https://eigenlayer-api-1.onrender.com/restakers

**Install dependencies**
  npm install

**Run the server**
  node index.js

**Run the Data Fetching Script**
  node scripts/fetchData.js
**📊 Data Source Explanation**
Mock Data is used in fetchData.js for demonstration.
This mirrors what a subgraph or smart contract query might return.
For real integration:
Use The Graph subgraphs
Or ethers.js/viem to read smart contracts (e.g., Lido staking data, EigenLayer restaking contracts)

**📌 Assumptions**
  stETH is the restaked asset.

  All timestamps are UNIX (seconds).

  Slash reasons and reward breakdowns are simulated.

  No authentication or pagination.

  No real-time blockchain fetch — static/mock only.
