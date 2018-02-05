import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PageTitle from '../PageTitle';
import LoadingIndicator from '../LoadingIndicator';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Users = (props) => {
  if (props.data.loading) {
     return <div>
       <PageTitle>Loading Users...</PageTitle>
       <LoadingIndicator />
     </div>;
  }
  else if (props.data.users) {
    return <div>
      <PageTitle>Users</PageTitle>
      <List>
        {props.data.users.map(user => (
          <ListItem button key={user.id} component={Link} to={`/users/${user.id}`}>
            <Avatar alt={user.name} src={user.avatarUrl} />
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </div>;
  }
};

export default graphql(gql`
  query {
    users {
      id
      name
      avatarUrl
    }
  }
`)(Users);
