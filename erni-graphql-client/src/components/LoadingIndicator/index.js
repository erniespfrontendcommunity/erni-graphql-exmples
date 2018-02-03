import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

export default () => (
  <div style={{ textAlign: 'center', padding: '80px 0' }}>
    <CircularProgress size={50} style={{
      display: 'inline-block'
    }} />
  </div>
);
