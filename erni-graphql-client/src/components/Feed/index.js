import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PageTitle from '../PageTitle';
import LoadingIndicator from '../LoadingIndicator';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Feed = (props) => {
  if (props.data.loading) {
     return <div>
       <PageTitle>Loading Tweets...</PageTitle>
       <LoadingIndicator />
     </div>;
  }
  else if (props.data.getFeed) {
    return <div>
      <PageTitle>Twitter Feed</PageTitle>
      <List>
        {props.data.getFeed.map(tweet => (
          <ListItem button key={tweet.id}>
            <Avatar alt={tweet.authorName} src={tweet.authorAvatarUrl} />
            <ListItemText primary={tweet.authorName} secondary={tweet.text} />
          </ListItem>
        ))}
      </List>
    </div>;
  }
};

export default graphql(gql`
  query {
    getFeed {
      id
      text
      authorName
      authorAvatarUrl
    }
  }
`)(Feed);
