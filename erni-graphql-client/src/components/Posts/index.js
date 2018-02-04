import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PageTitle from '../PageTitle';
import LoadingIndicator from '../LoadingIndicator';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export class Posts extends React.Component {
  // Keep track of subscription handle to not subscribe twice.
  // We don't need to unsubscribe on unmount, because the subscription
  // gets stopped when the query stops.
  subscription = null;

  componentWillReceiveProps(nextProps) {
    // We don't resubscribe on changed props, because it never happens in our app
    if (!this.subscription && !nextProps.loading) {
      this.subscription = this.props.subscribeToMore({
        document: POSTS_SUBSCRIPTION,
        updateQuery: (previousResult, { subscriptionData }) => {

          if (!subscriptionData.data) {
            return previousResult;
          }

          const newPost = subscriptionData.data.postAdded;

          return Object.assign({}, previousResult, {
            posts: [newPost, ...previousResult.posts]
          });
        },
      });
    }
  }

  render() {
    if (this.props.data.loading) {
       return <div>
         <PageTitle>Loading Posts...</PageTitle>
         <LoadingIndicator />
       </div>;
    }
    else if (this.props.data.posts) {
      return <div>
        <PageTitle>Posts</PageTitle>
        <List>
          {this.props.data.posts.map(post => (
            <ListItem button key={post.id}>
              <Avatar alt={post.user.name} src={post.user.avatarUrl} />
              <ListItemText primary={post.body} secondary={post.user.name} />
            </ListItem>
          ))}
        </List>
      </div>;
    }
  }
}

const POSTS_QUERY = gql`
  query {
    posts {
      id
      body
      user {
        name
        avatarUrl
      }
    }
  }
`;

const POSTS_SUBSCRIPTION = gql`
  subscription {
    postAdded {
      id
      body
      user {
        name
        avatarUrl
      }
    }
  }
`;

const withData = graphql(POSTS_QUERY, {
  props: (props) => {
    const { data: { loading, currentUser, entry, subscribeToMore } } = props;
    return {
      ...props,
      loading,
      currentUser,
      entry,
      subscribeToMore,
    }
  },
});

export default withData(Posts);
