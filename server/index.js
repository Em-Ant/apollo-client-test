const express = require('express');
const cors = require('cors');

const favicon = require('serve-favicon');

const path = require('path');

const graphQL = require('./graphql');

const app = express();

const delay = (ms) => (_, __, next) => setTimeout(() => next(), ms);

app.use(cors());

try {
  app.use(favicon(path.join(__dirname, '../build', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, '../build')));
} catch (e) {
  /* do nothing */
}

app.use('/api/graphql', delay(250), graphQL);

app.listen(4000, () =>
  console.log('Running a GraphQL API server at localhost:4000/graphql'),
);
