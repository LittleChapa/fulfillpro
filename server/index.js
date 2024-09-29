require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const router = require('./routes');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
