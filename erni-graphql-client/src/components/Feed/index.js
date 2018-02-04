import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PageTitle from '../PageTitle';
import LoadingIndicator from '../LoadingIndicator';

const Feed = (props) => {
  if (props.data.loading) {
     return <div>
       <PageTitle>Loading Tweets...</PageTitle>
       <LoadingIndicator />
     </div>;
  }
  else if (props.data.tweets) {
    return <div>
      <PageTitle>Twitter Feed</PageTitle>
      <List>
        {props.data.tweets.map(tweet => (
          <ListItem button key={tweet.id}>
            <Avatar alt={tweet.authorName} src={tweet.authorAvatarUrl} />
            <ListItemText primary={tweet.body} secondary={tweet.authorName} />
          </ListItem>
        ))}
      </List>
    </div>;
  }
};

export default Feed;
