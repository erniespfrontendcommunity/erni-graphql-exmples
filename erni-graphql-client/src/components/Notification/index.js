import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default props => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={props.open}
    autoHideDuration={2000}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<div id="message-id">{props.message}</div>}
  />
);
