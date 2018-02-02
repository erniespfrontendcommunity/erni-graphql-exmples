const connect = require('connect');
const http = require('http');
const { buildSchema } = require('graphql');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql/schema.js');
const resolvers = require('./graphql/resolvers.js');

const port = 3000;
const app = connect();
const builtSchema = buildSchema(schema);

app.use(expressGraphQL({
  schema: builtSchema,
  rootValue: resolvers,
  graphiql: true,
}));

http.createServer(app).listen(port);

console.log(`GraphQL API server running at localhost: ${port}`);
