const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { join } = require('path');
const favicon = require('serve-favicon');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const root = require('./root.js');

const schema = buildSchema(
  fs.readFileSync(join(__dirname, 'schema.graphql'), 'utf-8'),
);

const app = express();

app.use(cors());

try {
  app.use(favicon(join(__dirname, '../build', 'favicon.ico')));
  app.use(express.static(join(__dirname, '../build')));
} catch (e) {}

app.use(
  '/api/graphql',
  (_, __, next) => setTimeout(() => next(), 500), // 500ms delay
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
