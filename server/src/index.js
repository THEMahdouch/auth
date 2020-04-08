const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:8080'
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'My first authentication system 🔐',
  });
});

const authentication = require('./auth/auth.js');

app.use('/auth', authentication);

const errors = require('./errors/errors.js');

app.use(errors.notFound);
app.use(errors.errorHandler);


app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});