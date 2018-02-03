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
            <Route exact path="/" component={Posts} />
            <Switch>
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/:id" component={UserDetails} />
              <Redirect to="/" />
            </Switch>
          </Paper>
        </main>
      </div>
      </MuiThemeProvider>
  </Router>
);

export default withStyles(styles)(App);

const Feed = () => (
  <div>
    Feed
  </div>
);

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>
//
//     <Route path={`${match.url}/:topicId`} component={Topic}/>
//     <Route exact path={match.url} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )
//
// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )
