The client and server code for my presentation at ERNI Frontend Community

# Getting Started
You need to have `rethinkdb` installed for the database, more info here https://rethinkdb.com/docs/install/

After cloning the repo, open your terminal, go to server dir (`cd erni-graphql-server`) and execute the following commands to start the database:
```bash
# Installing the dependencies
npm install

# Starting the database
npm run start-db
```

Then open new terminal window (or tab) pointed to the same dir and start the node server:
```bash
# Starting the server
npm start
```
This will start the server in dev mode with auto reloading feature.

To start the client website open new terminal window (or tab) pointed to the client dir (`cd erni-graphql-client`) and execute the following commands:
```bash
# Installing the dependencies
npm install

# Starting the client website
npm start
```
