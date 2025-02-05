const express = require('express');
const cors = require('cors');
const elevatorRoutes = require('./src/routes/elevator-routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/elevators', elevatorRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
