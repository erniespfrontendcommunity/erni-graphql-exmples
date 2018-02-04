import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import PageTitle from '../PageTitle';
import LoadingIndicator from '../LoadingIndicator';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const UserDetails = (props) => {
  if (props.data.loading) {
     return <div>
       <PageTitle>Loading User Details...</PageTitle>
       <LoadingIndicator />
     </div>;
  }
  else if (props.data.getUser) {
    const user = props.data.getUser;
    let posts = null;

    if (user.posts && user.posts.length > 0) {
        posts = <List>
          {user.posts.map(post => (
            <ListItem button key={post.id}>
              <ListItemText primary={post.body} />
            </ListItem>
          ))}
        </List>;
    }
    else {
      posts = <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <span style={{ color: '#ddd', fontSize: 28 }}>No Posts</span>
      </div>;
    }

    return <div>
      <PageTitle>{user.name}</PageTitle>
      {posts}
    </div>;
  }
};

const userDetailsQuery = gql`
  query UserDetails($id: String!) {
    getUser(id: $id) {
      id
      name
      posts {
        id
        body
      }
    }
  }
`;

export default graphql(userDetailsQuery, {
  options: (props) => ({
    variables: {
      id: props.match.params.id
    }
  })
})(UserDetails);
