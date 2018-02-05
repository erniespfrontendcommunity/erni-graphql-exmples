import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PageTitle from '../PageTitle';
import LoadingIndicator from '../LoadingIndicator';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Feed extends React.Component {
  // Keep track of subscription handle to not subscribe twice.
  // We don't need to unsubscribe on unmount, because the subscription
  // gets stopped when the query stops.
  subscription = null;

  componentWillReceiveProps(nextProps) {
    // We don't resubscribe on changed props, because it never happens in our app
    if (!this.subscription && !nextProps.loading) {
      this.subscription = this.props.subscribeToMore({
        document: FEED_SUBSCRIPTION,
        updateQuery: (previousResult, { subscriptionData }) => {

          if (!subscriptionData.data) {
            return previousResult;
          }

          const newTweet = subscriptionData.data.tweetAdded;

          return Object.assign({}, previousResult, {
            tweets: [newTweet, ...previousResult.tweets]
          });
        },
      });
    }
  }

  render() {
    if (this.props.data.loading) {
       return <div>
         <PageTitle>Loading Tweets...</PageTitle>
         <LoadingIndicator />
       </div>;
    }
    else if (this.props.data.tweets) {
      return <div>
        <PageTitle>Twitter Feed</PageTitle>
        <List>
          {this.props.data.tweets.map(tweet => (
            <ListItem button key={tweet.uuid}>
              <Avatar alt={tweet.authorName} src={tweet.authorAvatarUrl} />
              <ListItemText primary={tweet.authorName} secondary={tweet.text} />
            </ListItem>
          ))}
        </List>
      </div>;
    }
  }
}

const FEED_QUERY = gql`
  query {
    tweets {
      id
      uuid
      text
      authorName
      authorAvatarUrl
    }
  }
`;

const FEED_SUBSCRIPTION = gql`
  subscription {
    tweetAdded {
      id
      uuid
      text
      authorName
      authorAvatarUrl
    }
  }
`;

const withData = graphql(FEED_QUERY, {
  // This is just a dirty hack to trigger componentWillReceiveProps()
  // because when props.data changes this method is not trigered
  // for sure, there is a better way to do this
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

export default withData(Feed);
