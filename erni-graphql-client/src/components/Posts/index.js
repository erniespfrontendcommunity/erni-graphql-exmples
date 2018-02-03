import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PageTitle from '../PageTitle';
import LoadingIndicator from '../LoadingIndicator';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Posts = (props) => {
  if (props.data.loading) {
     return <div>
       <PageTitle>Loading Posts...</PageTitle>
       <LoadingIndicator />
     </div>;
  }
  else if (props.data.posts) {
    // component={Link} to={`/posts/${post.id}`}
    return <div>
      <PageTitle>Posts</PageTitle>
      <List>
        {props.data.posts.map(post => (
          <ListItem button key={post.id}>
            <Avatar alt={post.user.name} src={post.user.avatarUrl} />
            <ListItemText primary={post.body} secondary={post.user.name} />
          </ListItem>
        ))}
      </List>
    </div>;
  }
};

export default graphql(gql`
  query {
    posts {
      id
      body,
      user {
        name,
        avatarUrl
      }
    }
  }
`)(Posts);
