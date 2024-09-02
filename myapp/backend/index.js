const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes'); // Ensure correct path
const authRoutes = require('./routes/authRoutes'); // Ensure correct path

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/student', studentRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
