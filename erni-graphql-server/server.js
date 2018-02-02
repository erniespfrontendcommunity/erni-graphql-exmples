const connect = require('connect');
const http = require('http');
const { buildSchema } = require('graphql');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql/schema.js');
const resolvers = require('./graphql/resolvers.js');
const r = require('rethinkdb');

const port = 3000;
const dbParams = { host: 'localhost', port: 28015 };
const handleError = res => error => {
  res.send(500, { error: error.message });
  console.error(error.stack);
};
const createDbConnection = (req, res, next) => {
  r.connect(dbParams)
    .then(connection => {
      req.dbConnection = connection;
      next();
    })
    .error(handleError(res));
};

const app = connect();

app.use(createDbConnection);
app.use(expressGraphQL({
  schema: buildSchema(schema),
  rootValue: resolvers,
  graphiql: true,
  pretty: true,
}));

http.createServer(app).listen(port);

console.log(`GraphQL API server running at localhost: ${port}`);
