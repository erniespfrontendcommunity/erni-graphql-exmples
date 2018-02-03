// Server
const bodyParser = require('body-parser');
const { createServer } = require('http');
const express = require('express');
// Database
const r = require('rethinkdb');
// GraphQL
const { execute, subscribe } = require('graphql');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const schema = require('./graphql/schema');

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

const app = express();

app.use(createDbConnection);

app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: req,
})));

app.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`,
}));

const server = createServer(app);

server.listen(port, () => {
  console.log(`GraphQL API server running at localhost: ${port}`);

  // Set up the WebSocket for handling GraphQL subscriptions.
  new SubscriptionServer({
    execute,
    subscribe,
    schema,
  }, {
    server,
    path: '/subscriptions',
  });
});
