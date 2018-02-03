import React from 'react';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';

const styles = (theme) => ({
  pageTitle: {
    margin: 0,
    padding: '15px',
    color: '#333',
    fontSize: 28
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '5px 6px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  }
});

export default withStyles(styles)((props) => (
  <div>
    <h1 className={props.classes.pageTitle}>{props.children}</h1>
    <Divider />
  </div>
));
