require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./routes');
const cors = require('cors');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENTURL,
  })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
