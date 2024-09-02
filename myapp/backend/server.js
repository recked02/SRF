const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

