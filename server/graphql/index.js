const path = require('path');
const fs = require('fs');

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const root = require('./rootResolver.js');

const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
);

const graphQLMWare = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});

module.exports = graphQLMWare;
