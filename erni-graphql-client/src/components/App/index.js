import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import pink from 'material-ui/colors/pink';
import MainMenu from '../MainMenu';
import Posts from '../Posts';
import Users from '../Users';
import Feed from '../Feed';
import UserDetails from '../UserDetails';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: pink,
  },
});

const styles = theme => ({
  content: {
    width: 600,
    margin: '0 auto',
  },
});

const App = (props) => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <div className={props.classes.root}>
        <MainMenu />
        <main className={props.classes.content}>
          <Paper>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/:id" component={UserDetails} />
              <Route exact path="/feed" component={Feed} />
              <Redirect to="/" />
            </Switch>
          </Paper>
        </main>
      </div>
      </MuiThemeProvider>
  </Router>
);

export default withStyles(styles)(App);
