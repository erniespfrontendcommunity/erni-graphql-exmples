import React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import PageTitle from '../PageTitle';
import LoadingIndicator from '../LoadingIndicator';
import IconButton from 'material-ui/IconButton';
import ControlPointIcon from 'material-ui-icons/ControlPoint';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import NoResults from '../NoResults';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const styles = theme => ({
  addPost: {
    position: 'absolute',
    top: 9,
    right: 9,
  },
});

class UserDetails extends React.Component {

  state = {
    open: false,
    newPostTextFieldValue: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  submitPost = () => {
    this.props.mutate({
      variables: {
        body: this.state.newPostTextFieldValue,
        userId: this.props.data.getUser.id
      }
    })

    .then(({ data }) => {
      this.handleClose();
      this.setState({ newPostTextFieldValue: '' });
      this.props.data.refetch();
    })

    .catch((error) => {
      console.log('there was an error sending the query', error);
    });
  };

  render() {
    if (this.props.data.loading) {
       return <div>
         <PageTitle>Loading User Details...</PageTitle>
         <LoadingIndicator />
       </div>;
    }
    else if (this.props.data.getUser) {
      const user = this.props.data.getUser;
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
        posts = <NoResults>No Posts</NoResults>;
      }

      return <div>
        <PageTitle className={this.props.classes.pageTitle}>
          {user.name}
          <IconButton
            aria-label="Add Post"
            className={this.props.classes.addPost}
            onClick={this.handleClickOpen}
          >
            <ControlPointIcon />
          </IconButton>
        </PageTitle>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
            On the average Web page, users have time to read at most 28% of the words during an average visit; 20% is more likely.
            We've known since our first studies of how users read on the Web that they typically don't read very much. Scanning text is an extremely common behavior for higher-literacy users; our recent eyetracking studies further validate this finding.
            </DialogContentText>
            <br />
            <br />
            <TextField
              value={this.state.newPostTextFieldValue}
              onChange={e => this.setState({ newPostTextFieldValue: e.target.value })}
              autoFocus
              id="name"
              label="How do you feel today?"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitPost} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {posts}
      </div>;
    }
  }
}

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

const withQuery = graphql(userDetailsQuery, {
  options: (props) => ({
    variables: {
      id: props.match.params.id
    }
  })
});

const createPostMutation = gql`
  mutation CreateUserPost($body: String!, $userId: String!) {
    createPost(body: $body, userId: $userId) {
      id
      body
      user {
        id
        name
        avatarUrl
      }
    }
  }
`;

const withMutation = graphql(createPostMutation, {
  options: (props) => ({
    variables: {
      userId: props.match.params.id
    }
  })
});

export default withQuery(withMutation(withStyles(styles)(UserDetails)));
